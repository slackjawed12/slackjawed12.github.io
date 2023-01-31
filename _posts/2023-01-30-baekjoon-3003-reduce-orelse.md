---
layout: single

title: "백준 3003 - 킹,퀸,룩,비숍,나이트,폰 (Java)"
categories: PS
tag: [Java, stream, reduce, Optional, orElse]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: false # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---
## 1. 문제 설명
 공백으로 구분된 6개의 정수를 입력으로 받아, [1, 1, 2, 2, 2, 8] 배열과 차이를 출력하는 간단한 문제다.<br/>
 연습삼아 입출력을 stream으로 하려고 풀어보았다.
 
## 2. 풀이
 
 ``` java
 import java.io.*;
 import java.util.Arrays;
 import java.util.stream.Stream;
 public class Main {
    public static void main(String[] args) throws Exception{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String[] stringArray = br.readLine().split(" ");
        int[] cmp = {1, 1, 2, 2, 2, 8};

        int[] arr = Stream.of(stringArray).mapToInt(Integer::parseInt).toArray();
        for(int i=0;i<6; i++){
            cmp[i]-=arr[i];
        }

        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        String ans = Arrays.stream(cmp).mapToObj(x->x+" ").reduce((x,y)->x+y).orElse("");
        bw.write(ans);
        bw.flush();
        bw.close();
    }
 }

 ```
 1. 입력<br/>
 입력 그대로 배열에 저장했다. 
 ``` java
 // 람다식 str -> Integer.parseInt(str)는 str이 중복되므로 Integer::parseInt로 축약가능
 int[] arr = Stream.of(stringArray).mapToInt(Integer::parseInt).toArray();
 ```
 2. 출력<br/>
    배열 출력의 디폴트 형식은 [e1, e2, e3, e4] 이런 식이다. 따라서 문자열을 따로 처리하는 과정이 필요했다.<br/>
    reduce로 요소들을 붙여주면 공백 하나를 둔 문자열이 출력된다.<br/>
    근데 API에 따르면 reduce는 Optional\<T>를 반환한다. 이 상태에서 toString하고 출력하면 Optional[e1 e2 e3 e4] 이런 식으로 나온다. 따라서 orElse를 붙여준다.
    
 ``` java
 // String ans1 = Arrays.stream(cmp).mapToObj(x->x+" ").reduce((x,y)->x+y).toString();
 // ans1의 출력 : Optional[e1, e2, e3, ...]
 String ans = Arrays.stream(cmp).mapToObj(x->x+" ").reduce((x,y)->x+y).orElse("");
 ```
    
 3. 배운 것<br/>
 stream의 reduce과, Optional의 orElse. 앞으로 적용할 데가 많을 것 같다.
