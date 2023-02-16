---
layout: single

title: "[MySQL] MySQL - 문자열 내장 함수"
categories: [sql, mysql]
tag: [SQL, MySQL, INSTR, SUBSTR, LOCATE]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

## 1. INSTR
``` sql
-- 주소가 강원도인 공장 찾기
SELECT factory_id, factory_name, address FROM food_factory 
WHERE INSTR(address, '강원도') > 0 ORDER BY factory_id;
```

## 2. LIKE

와일드카드 표현식을 사용해야 한다.

``` sql
-- 주소가 강원도인 공장 찾기
SELECT factory_id, factory_name, address FROM food_factory 
WHERE address LIKE '%강원도%' ORDER BY factory_id;
```


## 3. LOCATE


## 4. SUBSTR


## 5. LEFT, RIGHT
