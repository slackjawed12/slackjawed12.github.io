---
layout: single

title: "[백준][Java] 1072 - 게임"
categories: [algorithm, search]
tag: [Java, 이진탐색]
# 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
  nav : "docs"
# search : false # 검색 시 결과에 나타날지 여부 결정

# 로컬 개발환경 : slackjawed12.github.io 디렉터리 이동 후 bundle exec jekyll serve 실행
# 명령어에 나온 포트가 4000이면 localhost:4000 접속
---

## 1. 문제
[문제 링크](https://www.acmicpc.net/problem/1072) <br/>
이진 탐색을 이용해서 수학적 조건을 풀어내는 문제다. 비슷한 문제로, 프로그래머스의  [정수 제곱근 판별](https://school.programmers.co.kr/learn/courses/30/lessons/12934) 문제가 있다.<br/>
넓은 자연수 범위를 빠르게 탐색해야 할 때 자주 쓰인다. 자연수는 정렬된 배열이므로, 찾는 타겟을 1씩 카운트를 늘려서 찾는 게 아니라 이진 탐색으로 절반씩 날리면서 찾을 수 있다. 수학 방정식을 세워서 풀려면 double 형의 오차도 생각해야하고, 생각지 못한 예외처리를 해줘야 한다.

## 2. 코드

0부터 X까지 탐색범위를 잡고 이진탐색을 수행한다. 이진탐색은 경계조건을 설정할 때마다 헷갈린다. 계산해보면, Z+1을 만족해서 마지막 탐색이 끝날 때 만족하는 최솟값이 low가 된다. 

```java
public long solve(int X, int Y) {
  int low = 0;
  int high = X;
  int c;
  int Z = (int) ((long) Y * 100 / X);
  while (low <= high) {
    c = (low + high) / 2;
    if (((long) (Y + c) * 100) / (X + c) == Z) {
        low = c + 1;
    } else {
        high = c - 1;
    }
  }
  c = low;
  if (c > X) return -1;
  else return c;
}
```

## 3. 배운 것
조건을 만족하는 자연수 및 정수를 탐색하는 상황에서는 이진 탐색도 풀이 방식의 하나가 될 수 있다.