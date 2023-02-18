---
layout: single

title: "[MySQL] 집계함수(Aggregate Function)"
categories: [sql, mysql]
tag: [SQL, MySQL, COUNT, MIN, MAX, AVG]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

## 1. 집계함수 정리

[집계함수 목록](https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html)
링크에 잘 나와 있다.

## 2. AVG

평균값을 구한다. ROUND 함수 없이 출력하면 소숫점이 그대로 나온다.<br/>
ROUND에 다른 인자가 없으면 디폴트로 소숫점 첫번째 자리에서 반올림한 값을 구할 수 있다.

``` sql
-- SUV 차종의 평균 렌탈 비용 출력하기
SELECT 
ROUND(AVG(DAILY_FEE)) AS AVERAGE_FEE
FROM CAR_RENTAL_COMPANY_CAR
WHERE CAR_TYPE='SUV';
```

## 3. COUNT

출력대상 레코드의 개수를 세려면 COUNT를 사용한다.

``` sql
-- 2021년 가입 회원 중 20세 이상, 29세 이하 회원의 수
SELECT COUNT(*) AS users FROM user_info
WHERE joined >= '2021-01-01' AND joined<='2021-12-31' AND
age >= 20 AND age <= 29;
```