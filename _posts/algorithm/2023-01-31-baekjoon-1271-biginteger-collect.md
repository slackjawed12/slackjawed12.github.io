---
layout: single

title: "[백준][Java] 1271 - BigInteger"
categories: codingtest
tag: [Java, stream, BigInteger, collect]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

## 1. 문제 개요
[문제 링크](https://www.acmicpc.net/problem/1271)  <br/>

첫째 줄에는 가진 돈 $n$과 돈을 받을 대상의 수 $m$이 주어진다. ( $1 \leq m \leq n \leq 10^{1000}$, $m$과 $n$은 $10$진수 정수)
두 번째 줄에는 1원씩 분배할 수 없는 남는 돈을 출력한다.

## 2. 풀이 코드

 다루는 수가 매우 크기 때문에, primitve type은 쓸 수가 없다. 이 문제가 브론즈5인 이유는 Java의 경우 API에 BigInteger 클래스가 있어서, 아무리 큰 수여도 메소드로 알아서 풀리기 때문이다.<br/> 
 C나 C++로 풀려면 골치아프다. 문자열로 두 수를 받고 나눗셈을 직접 구현해야 할 것이다.
   
### 1) 입력
 BigInteger의 List 컬렉션으로 입력을 받아보았다. new 연산자도 ::로 축약 가능하다.<br/>
   
 ``` java
 List<BigInteger> arr = Arrays.stream(br.readLine().split(" "))
                              .map(BigInteger::new)
                              .collect(Collectors.toList());
 ```
 
### 2) BigInteger의 이용
 BigIneger의 경우 사칙연산을 하려면 내장된 메소드를 활용해야 한다. 나눗셈은 divde, 나머지 연산은 remainder이다.<br/>

 ``` java
 BigInteger ans1 = arr.get(0).divide(arr.get(1));
 BigInteger ans2 = arr.get(0).remainder(arr.get(1));
 ```