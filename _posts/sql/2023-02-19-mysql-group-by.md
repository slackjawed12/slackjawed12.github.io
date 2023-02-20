---
layout: single

title: "[MySQL] GROUP BY"
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

## 1. GROUP BY

GROUP BY 는 특정 컬럼들을 기준으로 같은 값을 가진 레코드를 하나의 그룹으로 모은다.<br/>
집계함수와 같이 사용할 때가 많다.<br/>
아래와 같이, 동물 보호소에 들어온 동물 중 같은 이름을 가진 동물이름과 그 수를 그룹화해서 출력한다.<br/>

```sql
SELECT 
    NAME,
    COUNT(*) AS COUNT
    FROM ANIMAL_INS
    GROUP BY NAME;
```

GROUP BY 뒤에 컬럼 이름은 간단히 작성할 수 있다.<br/>
SELECT 문에 나타난 순서대로 1, 2, 3 번호를 붙이면 된다.<br/>
이는 SELECT 컬럼의 대상이 많을 때 유용하다.<br/>

```sql
SELECT 
    NAME,
    COUNT(*) AS COUNT
    FROM ANIMAL_INS
    GROUP BY 1;
```

### vs DISTINCT
아래와 같이, GROUP BY는 DISTINCT와 기능은 동일하지만, 집계함수를 사용하는 맥락이 다르다.<br/>

``` sql
-- 같은 결과가 나온다.
SELECT DISTINCT COL1 FROM TEMP_TABLE;
SELECT COL1 FROM TEMP_TABLE GROUP BY COL1;

SELECT DISTINCT COL1, COL2 FROM TEMP_TABLE;
SELECT COL1, COL2 FROM TEMP_TABLE GROUP BY COL1, COL2;

-- DISTINCT 는 그룹 자체의 개수가 나온다
SELECT COUNT(DISTINCT COL1) FROM TEMP_TABLE;
-- GROUP BY 는 그룹화된 컬럼의 수량이 나온다.
SELECT COUNT(COL1) FROM TEMP_TABLE GROUP BY COL1;
```

## 2. HAVING

GROUP BY 로 그룹화를 한 후에 행들을 필터링한다.<br/>
WHERE 은 그룹화 전에 필터링 한다는 것이 HAVING 과 큰 차이점이다.<br/>

``` sql
-- 동명의 동물 중 두 번 이상 쓰인 이름만을 그룹화
SELECT 
    NAME,
    COUNT(*) AS COUNT
    FROM ANIMAL_INS
    GROUP BY NAME;
    HAVING COUNT(NAME) >= 2
```