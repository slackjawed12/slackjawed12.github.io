---
layout: single

title: "[LeetCode][MySQL] 182. Duplicate Emails"
categories: [sql, mysql]
tag: [SQL, MySQL, GROUP BY, HAVING]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

[문제 링크](https://leetcode.com/problems/duplicate-emails/)
Group by와 having을 이용하는 문제이다.

## 1. 문제 개요

&nbsp; &nbsp; email 컬럼 중 값이 2개 이상 나타나는 email을 찾는 쿼리를 구해야 한다. 

Input

|id|email|
|:---:|:---:|
|1|a@b.xx|
|2|c@d.xx|
|3|a@b.xx|

Output

|email|
|:---:|
|a@b.xx|


## 2. SQL문

``` sql
select email as Email
    from Person
    group by email
    having count(email)>=2
```

``` sql
select email as Email
    from Person
    group by email
    having count(email)>1
```
