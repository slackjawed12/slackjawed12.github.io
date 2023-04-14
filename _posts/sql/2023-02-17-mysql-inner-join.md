---
layout: single

title: "[MySQL] INNER JOIN"
categories: [sql, mysql]
tag: [SQL, MySQL, subquery, JOIN]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

&nbsp; &nbsp; JOIN은 두 개 이상의 테이블에서 조건에 부합하는 레코드만 조합하여 결과를 나타낼 때 사용한다.<br/>

## 1. INNER JOIN

&nbsp; &nbsp; INNER JOIN은 ON 절과 같이 쓰여서, ON 절 조건을 만족하는 데이터를 가져온다. ON 절은 WHERE 절에서 쓸 수 있는 조건들을 사용할 수 있다. 아래 sql문은 INNER JOIN을 활용한 것이다.

``` sql
-- 상반기 아이스크림 중 주문량 3000이 넘고, 재료가 과일 베이스인 아이스크림의 맛?
SELECT 
FH.FLAVOR 
    FROM FIRST_HALF FH
    INNER JOIN ICECREAM_INFO II
-- icecream_info 테이블의 flavor와 first_half 테이블의 flavor가 같은 것만 가져옴
    ON FH.FLAVOR = II.FLAVOR    
WHERE TOTAL_ORDER > 3000 AND INGREDIENT_TYPE = 'fruit_based' 
ORDER BY TOTAL_ORDER DESC
```

## 2. OUTER JOIN

&nbsp; &nbsp; OUTER JOIN은 조건에 부합하지 않아도 