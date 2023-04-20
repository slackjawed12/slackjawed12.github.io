---
layout: single

title: "[LeetCode][Linux] 195. Tenth Line"
categories: linux
tag: [bash, linux, LeetCode]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

[LeetCode 문제링크](https://leetcode.com/problems/tenth-line)

## 1. 문제
  
&nbsp; &nbsp; file.txt 파일 내용이 아래와 같다고 하자.

``` text
Line 1
Line 2
Line 3
Line 4
Line 5
Line 6
Line 7
Line 8
Line 9
Line 10
Line 11
```

&nbsp; &nbsp; 쉘 스크립트나 명령어를 통해 10번째 라인만 출력해야 하는 문제이다. 이 때, 파일의 행 수가 10보다 작을 경우 아무것도 출력하면 안 된다.

## 2. 해결방법 - tail + head

&nbsp; &nbsp; 아래는 tail 명령어의 옵션에 따른 출력 방식을 정리한 것이다.

``` bash
tail -n 7 test.txt # 끝에서부터 7개 행 출력
tail -n+10 test.txt # 10행부터 끝까지 출력
```

&nbsp; &nbsp; 두 번째 명령어인 tail -n+10 text.txt를 이용하면, 10행이 맨 위에 오는 출력 결과를 얻을 수 있다. 아래와 같이 head와 연결하면 된다.

``` bash
tail -n+10 test.txt | head -1
```

## 3. 해결방법 - sed, awk

``` bash
sed -n 10p file.txt
```

``` bash
awk 'NR == 10' file.txt
```