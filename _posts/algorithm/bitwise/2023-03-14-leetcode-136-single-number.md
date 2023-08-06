---
layout: single

title: "[LeetCode][Java] 136. Single Number"
categories: [algorithm, bitwise]
tag: [Java, XOR]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

## 1. 문제 개요

[문제 링크](https://leetcode.com/problems/single-number/) <br/>

배열에는 짝지어지지 못한 숫자가 하나 들어있고, 나머지 숫자는 2개씩 들어있다. 짝지어지지 못한 숫자를 $O(n)$ 시간 복잡도와 $O(1)$ 추가 공간 안에서 찾아야 한다. 즉, 해쉬 테이블을 쓸 수 없다.

## 2. 풀이 코드

배열의 시작부터 XOR 연산을 연속적으로 하면 된다. 이는 비트문자열에 대한 XOR 연산의 기본 성질에 의해 증명된다.

```java
public int singleNumber(int[] nums) {
    int ans = 0;
    for(int i = 0; i < nums.length; i++){
        ans ^= nums[i];
    }
    return ans;
}
```

### 비트문자열에 대한 XOR 연산의 기본 성질

다음과 같은 성질을 지닌다.

- 교환 법칙 : $A \oplus B = B \oplus A$  
- 결합 법칙 : $(A \oplus B) \oplus C = A \oplus (B \oplus C)$
- 항등원 : 임의의 $A$에 대해 $A \oplus 0 = A$
- 역원 : $ A \oplus A = 0$

