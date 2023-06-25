---
layout: single

title: "[LeetCode][Java] 190. Reverse Bits"
categories: [codingtest, bitwise]
tag: [Java, Shift]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

## 1. 문제 개요

[문제 링크](https://leetcode.com/problems/reverse-bits/) <br/>

&nbsp; &nbsp; 32 비트열을 reverse 시키는 문제이다. 예를 들어 다음과 같다.

|input|reversed|
|:---:|:---:|
|00000010100101000001111010011100|  00111001011110000010100101000000|
|11111111111111111111111111111101|10111111111111111111111111111111|

## 2. 풀이 코드

&nbsp; &nbsp; 가장 간단한 방법은 다음과 같다. 먼저 32번 루프를 도는 것이다. 31번 비트부터 0번 비트 순서로 각 비트를 right 쉬프트 연산을 통해 구하고, 이것을 다시 left 쉬프트로 위치시켜주면 된다.

```java
public int reverseBits(int n) {
    int answer = 0;
    int digit = 0;
        
    while(digit != 32) {
        int bit = (n >> (31 - digit)) & 1;
        answer |= bit << digit++;
    }
        
    return answer;
}
```

&nbsp; &nbsp; 코드의 가독성을 약간 줄이고 속도를 개선하는 방법은 다음과 같다.

```java
public int reverseBits(int n) {
    n = ((n & 0xFFFFFFFF) << 16 | ((n & 0xFFFFFFFF) >>> 16));       
    n = ((n & 0x00FF00FF) << 8 | (n & 0xFF00FF00) >>> 8);   
    n = ((n & 0x0F0F0F0F) << 4) | ((n & 0xF0F0F0F0) >>> 4);
    n = ((n & 0x33333333) << 2) | ((n & 0xCCCCCCCC) >>> 2);   
    n = ((n & 0x55555555) << 1) | ((n & 0xAAAAAAAA) >>> 1);   
    return n;
}
```

&nbsp; &nbsp; right shift는 '>>>' 를 사용하여 logical하게 right shift 하도록 처리했다. '>>'를 사용하면 arithmetic shift이므로 부호를 유지하기 때문에 원하는 정답이 나오지 않는다.  