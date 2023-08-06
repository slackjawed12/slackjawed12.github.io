---
layout: single

title: "[백준][Java] 2163 - 초콜릿 자르기"
categories: [algorithm, recursion]
tag: [Java, recursion, dp]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

## 1. 문제 개요
[문제 링크](https://www.acmicpc.net/problem/2163) <br/>
 
 재귀 구조가 명확히 나오는 문제였다.<br/>
 근데 숫자가 조금만 커져도 스택이 넘칠 것 같다.<br/>

## 2. 풀이 코드
 
 ``` java
 public static int f(int x, int y) {
        if (x == 1 && y == 1) return 0;
        else {
            if (x <= y) return f(x, y / 2) + f(x, y - (y / 2)) + 1;
            else return f(x / 2, y) + f(x - (x / 2), y) + 1;
        }
    }
 ```

