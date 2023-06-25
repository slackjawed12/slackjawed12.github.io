---
layout: single

title: "[MySQL] 문자열 내장 함수"
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

## 1. MySQL 문자열 내장 함수 정리
[문자열 함수 및 연산자](https://dev.mysql.com/doc/refman/8.0/en/string-functions.html)
링크에 자세히 나와 있다.

## 2. INSTR
``` sql
-- 주소가 강원도인 공장 찾기
SELECT factory_id, factory_name, address FROM food_factory 
WHERE INSTR(address, '강원도') > 0 ORDER BY factory_id;
```

## 3. LIKE

와일드카드 표현식인 %와 함께 사용할 수 있다.

``` sql
-- 사례 1) 주소 문자열에 '강원도' 가 들어가 있는 공장 찾기
SELECT factory_id, factory_name, address FROM food_factory 
WHERE address LIKE '%강원도%' ORDER BY factory_id;
```

여러 조건이 필요하면 OR로 연결할 수 있다.<br/>
해당 조건으로 코드가 길어지면 NOT LIKE를 시도해보자.<br/>

```sql
-- 중성화 한 동물은 O, 안 한 동물은 X로 출력
-- CASE THEN 구문으로도 작성할 수 있다.
SELECT
    ANIMAL_ID,
    NAME,
    IF(SEX_UPON_INTAKE LIKE '%Neutered%' OR 
       SEX_UPON_INTAKE LIKE '%Spayed%', 'O', 'X') AS 중성화
FROM ANIMAL_INS
ORDER BY ANIMAL_ID;
```


## 4. LOCATE

## 5. SUBSTR

## 6. LEFT, RIGHT
