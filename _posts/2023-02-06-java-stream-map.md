---
layout: single

title: "[Java] Stream 써서 배열 두 개가 주어지는 문제 풀기"
categories: java
tag: [Java, algorithm, stream]
# 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
  nav : "docs"
# search : false # 검색 시 결과에 나타날지 여부 결정

# 로컬 개발환경 설정 : slackjawed12.github.io 디렉터리 이동 후 bundle exec jekyll serve 명령어 실행
# 명령어에 나온 포트가 4000이면 localhost:4000 접속
---

## 1. 문제
 
 [문제 링크](https://www.acmicpc.net/problem/25304)
  
 링크 문제처럼 두 개의 배열이 주어져서 연산을 해야되는 경우, <br/>
 Stream으로 두 개의 배열끼리 연산하는 법을 몰라서 반복문을 써왔다.

## 2. 해결 방법

### 1) Java 코드

```java
List<int[]> entry = new ArrayList<>();
// entry에 배열 입력 - 크기가 2인 배열이 List의 요소가 된다.
long sum = entry.stream().map( x -> 
                Arrays.stream(x)
                .reduce((a, b) -> a * b).orElse(0))
                .map(Integer::toUnsignedLong)
                .reduce(Long::sum).orElse((long)0);
```

## 3. 알게 된 것
  
  stream의 map을 쓰면 배열도 형 변환 할 수 있다.
  
<br/>
<br/>
틀린 부분은 댓글 남겨주세요.