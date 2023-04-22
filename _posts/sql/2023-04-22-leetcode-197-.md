---
layout: single

title: "[MySQL][LeetCode] 197. Rising Temperature"
categories: [sql, mysql]
tag: [SQL, date, join]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

&nbsp; &nbsp; [문제 링크](https://leetcode.com/problems/rising-temperature/)
어제 날짜보다 기온이 높은 날짜들을 선택해서 보여주는 문제이다. 테이블을 self join 후 date_add를 통해 날짜계산해서 where 절로 조건을 주고 뽑아내면 된다.

## 1. 문제 개요

Input

|id|recordDate|temperature|
|:---:|:---:|:---:|
|1|2015-01-01|10|
|2|2015-01-02|25|
|3|2015-01-03|20|
|4|2015-01-04|30|


Output

|id|
|:---:|
|2|
|4|


## 2. 풀이 - join on + date_add

&nbsp; &nbsp; subquery로 어제 날짜에 해당하는 view를 따로 만들어야하나 했는데, 하루 차이의 조건을 어떻게 줘야하는지 떠오르지 않았다. view를 따로 만들지 않고, self join을 해서 날짜 차이 조건을 on 절에 적용했다.  
&nbsp; &nbsp; 날짜 계산은 mysql 함수인 date_add를 적용했다.

``` sql
select w.id
from Weather w
join Weather y
on w.recordDate=date_add(y.recordDate, interval 1 day)
where w.temperature>y.temperature
```
