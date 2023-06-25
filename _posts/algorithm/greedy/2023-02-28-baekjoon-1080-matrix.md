---
layout: single

title: "[백준][Java] 1080 - 행렬"
categories: [algorithm, greedy]
tag: [Java, greedy]
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
[문제 링크](https://www.acmicpc.net/problem/1080) <br/>
그리디 알고리즘으로 행렬 뒤집기 연산 횟수로 같은 모양을 만들어내는 문제이다.
그리디로 풀 때는 항상 택도없이 느려서 통과못할 것이 뻔한 전수조사 알고리즘을 먼저 떠올리다가, 이것을 간단하게 만들어줄 어떤 관계를 찾게된다. 아직은 그걸 문제마다 쉽게 찾아내기가 어렵다. 

## 2. 코드

문제에서 수행되는 연산은 자기를 포함한 근방의 3x3 요소의 0과 1을 뒤집는 것이다. 이것을 flop 이라는 함수로 정의했다. 이제 flop 함수의 적용 경우의수를 조사해야하는데, 최대 크기가 50x50이므로 순서까지 따져가면서 조사할 수는 없다.

```java
public int[][] flop(int[][] m, int x, int y) {
  for (int i = y - 1; i <= y + 1; i++) {
      for (int j = x - 1; j <= x + 1; j++) {
          m[i][j] = (m[i][j] == 0) ? 1 : 0;
      }
  }
  return m;
}
```
(x, y)에서 flop이 수행됐는지 여부를 알아내려면 비교대상인 B 행렬과 (x-1, y-1) 위치만 비교하면된다. <br/>
즉, 왼쪽 구석 행렬요소가 B의 값과 다르면 flop을 수행하고 같으면 수행하지 않는다. 왼쪽 구석 행렬요소는 loop 중에 다시는 뒤집히지 않게 되므로, 순서를 바꿔가며 모든 경우의수를 조사할 필요가 없는 것이다.

```java
public int solve(int[][] A, int[][] B) {
    int answer = -1;
    int temp = 0;
    for (int i = 1; i < A.length - 1; i++) {
        for (int j = 1; j < A[0].length - 1; j++) {
            if (A[i - 1][j - 1] != B[i - 1][j - 1]) {
                A = flop(A, j, i);
                temp++;
            }
        }
    }
    if (Arrays.deepEquals(A, B)) answer = temp;

    return answer;
}
```

## 3. 배운 것
문제의 어떤 조건으로 그리디하게 문제를 풀어낼 수 있는지 파악하기가 아직 어렵다. 