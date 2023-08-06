---
layout: single

title: "[LeetCode][Java] 231. Power of Two"
categories: [algorithm, bitwise]
tag: [Java, Bitwise]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

## 1. 문제 개요

[문제 링크](https://leetcode.com/problems/power-of-two/) <br/>

&nbsp; &nbsp; 주어진 숫자가 2의 제곱인지 판별하는 함수를 작성하는 문제이다.


## 2. 풀이 1 - 반복문 사용

&nbsp; &nbsp; 비트문자열에 대해 loop에서 1이면 카운트를 늘려 카운트가 2이상인지 체크하면 된다.

```java
public boolean isPowerOfTwo(int n) {
    if(n <= 0){
        return false;
    }
        
    int count = 0;
    while(n != 0){
        count += n & 1;
        if(count == 2) {
            return false;
        }
        n = n >>> 1;
    }
    return true;
}
```

## 3. 풀이 2 - 비트연산 사용

&nbsp; &nbsp; n & (n - 1) 연산을 통해 2의 제곱인지 체크할 수 있다. 다음 예시를 통해 확인할 수 있다.

### 2의 제곱인 경우

&nbsp; &nbsp; 2의 제곱인 1, 2, 4, 8의 비트문자열과 1을 뺀 비트 문자열을 보면 모든 경우에 대해 n & (n-1)이 0이 나온다는 것을 알 수 있다.

|n|n-1|n & (n-1)|
|:---|:---|:---|
|1|0|0|
|10|01|00|
|100|011|000|
|1000|0111|0000|

### 2의 제곱이 아닌 경우

&nbsp; &nbsp; 3, 5, 6, 7의 경우 연산을 해보면 결과는 다음과 같다. 

|n|n-1|n & (n-1)|
|:---|:---|:---|
|11|10|10|
|101|100|100|
|110|101|100|
|111|110|110|

### n & (n - 1)의 의미

&nbsp; &nbsp; 결과를 일반화하면, n & (n - 1)은 비트문자열의 마지막 1을 없애준다는 것을 알 수 있다. 따라서 어떤 수가 2의 제곱이면 비트문자열의 1이 1개이므로 연산 결과가 0이고, 2의 제곱이 아니면 마지막 1을 없애도 1이 하나 이상 남게되므로 0이 아니다.

### 풀이 코드

``` java
public boolean isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1) == 0);
}
```