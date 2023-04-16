---
layout: single

title: "[WIL] 실전 프로젝트 2주차 회고"
categories: til99
tag: [WIL]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

## 1. 4/9~4/15 회고

&nbsp; &nbsp; 2주차의 주제는 API 문서화였다. 노션에 수기로 작성한 API가 보기 불편했고, 수정사항이 생길 때마다 팀원 간 의사소통 비용이 발생한다는 문제가 있었다. 이런 문제를 어느 정도 해결하기 위해 Swagger를 도입했다. 그런데 Swagger는 프로덕션 코드에 어노테이션을 작성해야 문서화가 이뤄진다는 문제가 있었고, 결국 배포 이전의 문서화는 여전히 비효율적이었다.   
&nbsp; &nbsp; 이런 Swagger의 단점을 보완하기 위해 Spring REST Docs를 도입했다. asciidoc으로 문서화된 API를 보기 위해 컨트롤러 레이어에 테스트 코드를 작성하여 Spring REST Docs로 문서 snippet을 만들고, asciidoctor 라이브러리를 통해 html 파일로 문서를 변환했다. 이 과정에서 맞닥뜨린 장벽들이 있었는데, 첫 번째는 MockMvc를 통한 컨트롤러 레이어 테스트, 두 번째는 gradle build 파일 작성법이었다.

## 2. MockMvc를 통한 컨트롤러 테스트

&nbsp; &nbsp; 테스트 코드를 Controller, Service, Repository 레이어로 나누어서 작성했는데, '굳이 Controller도 테스트 해야하나?' 라는 의구심 때문에 2주차까지 Controller 레이어는 테스트를 하고 있지 않았다. 결국 Spring REST Docs를 접하고 나서 테스트 코드를 부랴부랴 작성하기 시작했다.  
&nbsp; &nbsp; 문제는 Controller 테스트 과정에서 도입한 MockMvc의 동작을 이해하기 힘들었다는 것이다. 좀 더 정확히 말하면 Mock 테스트 더블의 작동 방식에 대한 이해도가 부족했다.  
&nbsp; &nbsp; 예를 들면 예약을 등록할 때 requestBody에 아무 것도 없으면 400에러를 반환할 것이라고 예상했는데, 200 OK를 반환했다.

``` java
// given
// 주석처리 해도 Ok 통과됨
when(reservationService.addReservation(eq(1L), any(), any(UserDetailsImpl.class))).thenReturn(response);

 // when
ResultActions result = mockMvc.perform(MockMvcRequestBuilders.post(url)
            .header("Authorization", "Bearer Token")
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON)
            .content(""));  // requestBody가 비어있으면 실제로는 400에러

// then
result.andExpect(status().isOk());
```
&nbsp; &nbsp; 심지어 위의 코드에서 when-thenReturn stubbing이 없어도 Ok를 반환했다. 이후 then 절의 문서화 과정에서 andDo로 build되는 구문을 추가하면 테스트는 실패한다. 즉, when-thenReturn의 stubbingdl 없으면 Ok이지만 responseBody가 없는 응답을 반환한다는 것이었다.  
&nbsp; &nbsp; 잘 생각해보니, 400에러코드는 service 계층에서 판단하고 띄우고 있었다. 즉, requestBody가 잘못된 양식인 경우 에러코드를 컨트롤러 레이어에서 반환하게 하려면, 컨트롤러가 파라미터를 검증해야한다는 것이었다. 그래서 아래와 같이 파라미터에 Valid 어노테이션과 DTO의 필드에 NotEmpty를 붙였더니 원하는 400 코드가 반환되었다. 이렇게 테스트 코드를 작성해서 컨트롤러 레이어에 필요했던 로직이 자연스럽게 추가되었다.
``` java
@PostMapping("/reservations")
public ResponseEntity addReservation(@RequestBody @Valid RequestDto requestDto) {
    return reservationService.addReservation(requestDto));
}
```

## 3. Spring REST Docs, Asciidoctor, build.gradle

&nbsp; &nbsp; 컨트롤러 레이어의 테스트 코드를 통해 api에 대한 정보를 asciidocd 조각들로 문서화하는 Spring REST Docs, 그리고 조각들을 합쳐서 html로 만들어주는 asciidoctor 라이브러리를 도입했다. 이 과정에서 build.gradle의 문법과 작동 방식을 어렴풋이 이해할 수 있었다.  
&nbsp; &nbsp; 예를 들어 asciidoctor가 추가되면서 build.gradle에 추가된 로직은 다음과 같다.

``` gradle
ext {
    snippetsDir = file('build/generated-snippets')
}

test {
    useJUnitPlatform()
    outputs.dir snippetsDir
}

asciidoctor {
    dependsOn test
    configurations 'asciidoctorExt'
    inputs.dir snippetsDir

    baseDirFollowsSourceFile()
}

asciidoctor.doFirst {
    delete file('src/main/resources/static/docs')
}

tasks.register('copyDocument', Copy) {
    dependsOn asciidoctor
    from file("build/docs/asciidoc")
    into file("src/main/resources/static/docs")
}
```
&nbsp; &nbsp; gradle은 build 시에 디폴트로 테스트 과정이 포함되어 있는데, 이런 구문들을 추가하면 asciidoctor는 테스트 결과(depenedsOn test)에 따라 로직을 수행한다.  
&nbsp; &nbsp; 즉, 테스트가 성공하면 asciidoctorExt라고 정의된 configuration에 의해(이는 dependecies에 import 되어 있다.) 문서 조각들을 정해진 디렉터리에 만들게 된다. 마지막으로 register task를 통해 from 디렉터리의 파일을 into 디렉터리로 복사한다. 이처럼 빌드 시에 원하는 시나리오를 gradle에서 제공하는 문법을 통해 커스터마이징 할 수 있다는 것을 알 수 있었다. 물론 처음부터 이걸 혼자서 다 작성할 필요는 없고, 대부분은 공식 문서들에서 잘 설명해준다. 위의 코드들도 Spring REST Docs 공식 문서에 그대로 설명된 부분들이 많다.

## 4. 여담 
&nbsp; &nbsp; 단순히 테스트 코드를 성공/실패로만 nested해서 분류했던 것이 불편했는데, 테스트 코드를 문장구조로 계층화하는 블로그 레퍼런스들이 있어 참고하여 아래처럼 작성해보았다. 필요한 경우 given 변수들을 같은 클래스 안에서 처리할 수 있어서 편리했고, 원하는 상황을 직관적으로 찾기에도 편했다.

![스크린샷 2023-04-16 오후 6 22 00](https://user-images.githubusercontent.com/77224652/232290407-2393058d-9bba-4e5d-b892-d51c4fc7bae9.png)

## 5. 다음 주 주제
&nbsp; &nbsp; 다음 주는 개인 스케줄 도메인과 회의 도메인을 연관짓는 작업이 필요하다. 그리고 프로메테우스, 그라파나 등 모니터링 도구를 공부하고 프로젝트에 도입을 시도할 예정이다.


