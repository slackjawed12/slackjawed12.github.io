---
layout: single

title: "[백준][Python] 1057 - 토너먼트"
categories: [algorithm, recursion]
tag: [Python, recursion]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

&nbsp; &nbsp; $N$명이 참가하는 토너먼트에서 $a$번 참가자와 $b$번 참가자는 토너먼트에서 계속 이긴다고 가정할 때, 몇 번째 라운드에서 두 참가자가 만나는지 구하는 문제이다. [문제 링크](https://www.acmicpc.net/problem/1057)

## 1. 풀이

### 반복문을 사용한 풀이
&nbsp; &nbsp; 먼저 2로 나눴을 때 값이 같으면 토너먼트에서 만났다는 것을 의미한다. 그리고 다음 라운드에서 자신의 번호는 2로 나눠진다. 따라서, 두 숫자 a, b가 같지 않을 때 까지 while loop를 수행한다. 한 번의 loop 동안 a와 b는 2로 나눈만큼 빼고, 정답을 1 올린다. 

```python
N, a, b = map(int, open(0).read().split())
answer = 0
while a != b:
    a -= a // 2
    b -= b // 2
    answer += 1

print(answer)
```

### 재귀함수를 사용한 풀이
&nbsp; &nbsp; N, a, b와 현재 라운드인 ans를 파라미터로 받아서 푼다. 기저 조건은 왼쪽 숫자와 오른쪽 숫자를 1 더한 뒤 2로 나눈 값이 같으면 경기에서 만난 것이다. 만나지 않았으면 해당 값들로 재귀함수를 호출한 값에 1을 더한 것을 반환한다.

```python
def run(num, left, right, ans) -> int:
    if (left + 1) // 2 == (right + 1) // 2:
        return ans
    else:
        return run(num // 2, (left + 1) // 2, (right + 1) // 2, ans) + 1

N, a, b = map(int, open(0).read().split())
answer = run(N, a, b, 1)
print(answer)
```

## 2. 배운 점

&nbsp; &nbsp; 이번 문제에서 '2로 나눴을 때 값이 같으면 두 숫자는 경기를 하는 것'이라는 규칙은 문제에서 숨겨져 있고, 이것을 찾아서 문제를 풀어야했다. 결국 loop로 풀든 재귀로 풀든 베이스 조건인 정답 도달 조건을 하나의 표현식, 조건으로 어떻게 나타낼지 고민해야 하고, 이 과정에서 규칙을 추론할 수 있게 된다.
