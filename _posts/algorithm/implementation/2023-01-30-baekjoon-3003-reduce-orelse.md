---
layout: single

title: "[백준][Java] 3003 - 킹,퀸,룩,비숍,나이트,폰"
categories: [algorithm, implementation]
tag: [Java, stream, reduce, Optional, orElse]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: false # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

## 1. 문제 개요
[문제 링크](https://www.acmicpc.net/problem/3003)
### 문제
동혁이는 오래된 창고를 뒤지다가 낡은 체스판과 피스를 발견했다.<br/>
체스판의 먼지를 털어내고 걸레로 닦으니 그럭저럭 쓸만한 체스판이 되었다. 하지만, 검정색 피스는 모두 있었으나, 흰색 피스는 개수가 올바르지 않았다.<br/>
체스는 총 16개의 피스를 사용하며, 킹 1개, 퀸 1개, 룩 2개, 비숍 2개, 나이트 2개, 폰 8개로 구성되어 있다.<br/>
동혁이가 발견한 흰색 피스의 개수가 주어졌을 때, 몇 개를 더하거나 빼야 올바른 세트가 되는지 구하는 프로그을 작성하시오.<br/>

### 입력
첫째 줄에 동혁이가 찾은 흰색 킹, 퀸, 룩, 비숍, 나이트, 폰의 개수가 주어진다. 이 값은 0보다 크거나 같고 10보다 작거나 같은 정수이다.

### 출력
첫째 줄에 입력에서 주어진 순서대로 몇 개의 피스를 더하거나 빼야 되는지를 출력한다.<br/>
만약 수가 양수라면 동혁이는 그 개수 만큼 피스를 더해야 하는 것이고, 음수라면 제거해야 하는 것이다.
<br/>
<br/>

## 2. 풀이 코드 및 설명

<script src="https://gist.github.com/slackjawed12/a5820e1d6cb440bdb35e24dd862ee6b7.js"></script>

### 1) 입력
 입력 그대로 배열에 저장했다.

 ``` java
 // 람다식 str -> Integer.parseInt(str)는 str이 중복되므로 Integer::parseInt로 축약가능
 int[] arr = Stream.of(stringArray).mapToInt(Integer::parseInt).toArray();
 ```


### 2) 출력
 배열 출력의 디폴트 형식은 [e1, e2, e3, e4] 이런 식이다. 따라서 문자열을 따로 처리하는 과정이 필요했다.<br/>
 reduce로 요소들을 붙여주면 공백 하나를 둔 문자열이 출력된다.<br/>
 근데 API에 따르면 reduce는 Optional\<T>를 반환한다. 이 상태에서 toString하고 출력하면 Optional[e1 e2 e3 e4] 이런 식으로 나온다. 따라서 orElse를 붙여준다.

 ``` java
 // String ans1 = Arrays.stream(cmp).mapToObj(x->x+" ").reduce((x,y)->x+y).toString();
 // ans1의 출력 : Optional[e1, e2, e3, ...]
 String ans = Arrays.stream(cmp)
                    .mapToObj(x -> x + " ")
                    .reduce((x, y) -> x + y).orElse("");
 ```


## 3. 더 공부할 것
 stream의 reduce과, Optional의 orElse. 앞으로 적용할 데가 많을 것 같다.
