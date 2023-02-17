---
layout: single

title: "[MySQL] MySQL - SELECT"
categories: sql
tag: [SQL, MySQL, SELECT, ORDER BY, COUNT, AS, SELECT IF]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

## 1. SELECT 연습
SQL의 SELECT 쿼리로 데이터를 조회하는 방법을 연습하고 있다.<br/>
SELECT ~ FROM ~ WHERE 의 기본구조를 바탕으로, 문제에 따라 ORDER BY, COUNT 등 여러 조건들과 연산자를 적용해보았다.

## 2. ORDER BY

### WHERE + ORDER BY

where 조건으로 추려낸 데이터를 order by 기준으로 정렬한다.
정렬 기준의 default는 오름차순이다.

``` sql
-- 보호소에 들어온 동물 중 늙은 동물의 아이디, 이름을 조회
-- 출력 순서는 id 순서
SELECT animal_id, name FROM animal_ins
WHERE intake_condition = 'Aged' ORDER BY animal_id;

-- 이름 있는 동물의 id를 오름차순으로 조회
-- 이름이 없으면 null이다.
SELECT animal_id FROM animal_ins
WHERE name is not null ORDER BY animal_id;
```

### ORDER BY - DESC 
뒤에 DESC를 붙여주면 내림차순으로 된다. 정렬 기준이 여러개인 경우 ,(컴마)로 연결해주면 된다.

``` sql
-- 보호소에 들어온 동물 중 동물 아이디, 이름, 보호 시작일 조회
-- 출력 순서는 이름 순서, 이름이 같으면 최근 보호 시작일 순서
SELECT animal_id, name FROM animal_ins
ORDER BY name, datetime DESC;
```

### ORDER BY - LIMIT

LIMIT 를 이용해서 출력 대상의 개수를 제한할 수 있다.

``` sql
-- 가장 먼저 들어온 동물의 이름 조회
SELECT name FROM animal_ins
ORDER BY datetime LIMIT 1;
```

### MIN, MAX

구하려는 값이 1개이고 최대, 최솟값 자체만 필요하다면 MIN, MAX를 이용해도 된다. 성능은 order by limit보다 좋다.

``` sql
-- 제일 비싼 제품의 가격 찾기
SELECT MAX(price) FROM product;
```


## 3. AS

출력할 컬럼의 이름을 바꾸려면 뒤에 AS를 붙여주면 된다.

``` sql
-- 가장 비싼 제품의 가격을 max_price로 출력
SELECT price as max_price from product
order by price desc limit 1
```

## 4. COUNT

출력할 컬럼의 개수를 세려면 COUNT를 사용한다.

``` sql
-- 2021년 가입 회원 중 20세 이상, 29세 이하 회원의 수
SELECT COUNT(*) AS users FROM user_info
WHERE joined >= '2021-01-01' AND joined<='2021-12-31' AND
age >= 20 AND age <= 29;
```

## 5. SELECT IF

조건이 들어갈 때 사용한다.

### IFNULL
``` sql
-- 경기도 위치한 공장 찾기
-- 조건 : 냉동시설 여부(freezer_yn)가 null 이면 'N', 아니면 값 그대로 출력
SELECT warehouse_id, warehouse_name, address, 
IFNULL(freezer_yn, 'N') AS freezer_yn
FROM food_warehouse
WHERE left(address, 3) = '경기도'
ORDER BY warehouse_id ASC;
```