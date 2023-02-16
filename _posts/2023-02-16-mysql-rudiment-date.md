---
layout: single

title: "[MySQL] MySQL - 날짜, 시간 내장 함수 정리"
categories: [sql, mysql]
tag: [SQL, MySQL, DATE_FORMAT]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

## 1. 날짜 처리 내장 함수

[MySQL 날짜, 시간 함수](https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html) 링크에 자세히 나와 있다.<br/>
대표적인 것만 정리해보았다.


## 2. YEAR, MONTH, DAY

각각 해당 날짜의 연도, 월, 일을 찾을 때 사용한다.

``` sql
-- 2021년 가입 회원 중 20세 이상, 29세 이하 회원의 수
SELECT count (*) as users from user_info
WHERE YEAR(joined) = 2021 AND age >= 20 AND age <= 29;
```

## 3. DATE_FORMAT

``` sql
-- 2021년 가입 회원 중 20세 이상, 29세 이하 회원의 수
SELECT count (*) as users from user_info
WHERE DATE_FORMAT(JOINED, '%Y') = 2021 AND 
age >= 20 AND age <= 29;
```