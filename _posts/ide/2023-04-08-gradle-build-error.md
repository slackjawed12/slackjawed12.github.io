---
layout: single

title: "Intellij에서 Gradle Build 무한로딩 처럼 보이는 현상"
categories: spring
tag: [Spring, gradle, M2]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

## 1. 환경 및 에러 상황

- MacBook M2 Pro
- Intellij IDEA
- Build : Gradle
- Framework : Spring boot 2.7.10

&nbsp; &nbsp; Spring boot Application을 Run 하면 main 메서드가 계속 돌고, 서버는 뜨지 않는 현상이 발생했다. Windows 10을 사용할 때는 일어나지 않았던 에러인데, M2와 관련이 있는건가 싶다.  
&nbsp; &nbsp; 알고보니 main 메서드의 무한로딩이 아니라 그냥 빌드가 무사히 올라간 것이었다. 메인페이지 들어갔더니 whitelabel page가 잘 뜬다.. 어쨌든 아래 해결 방법은 무한로딩의 해결이 아니라 '무한로딩 처럼 보이는 것을 안보이게'하는 해결 방법이 되겠다.


## 2. 해결 방법

&nbsp; &nbsp; Settings의 Build, Execution, Deployment 항목에 들어간다. Build Tools 항목을 선택하고 Build 도구인 Gradle을 선택한다.  
&nbsp; &nbsp; 이후 Build and Run using, Run test using 두 항목을 Gradle이 아닌 Intellij IDEA로 변경한다. Lombok 등 어노테이션 라이브러리를 사용하는 경우 Annotation Processor 설정도 추가해줘야 한다. Settings의 Build, Execution, Deployment 항목에서 Compiler에 들어가서 Annotation Processor 항목을 선택한다. 그리고 Enable Annotation Processor 옵션을 활성화 하면 된다.