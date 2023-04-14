---
layout: single

title: "[MySQL] OUTER JOIN"
categories: [sql, mysql]
tag: [SQL, MySQL, JOIN]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

## 1. OUTER JOIN

&nbsp; &nbsp; OUTER JOIN은 INNER JOIN과는 다르게 ON 절의 조건에 만족하지 않아도 레코드들을 불러온다. 다음 상황을 생각해보자.  
Person Table
|personId|성|이름|
|:---:|:---:|:---:|
|1|강|백호|
|2|윤|대협|


Address table
|addressId|personId|state|city|
|:---:|:---:|:---:|:---:|
|1|2|서울시|강남구|
|2|3|강원도|강릉시|

&nbsp; &nbsp; 이제 조건과 상관없이 다음과 같은 결과를 얻고싶다면, OUTER JOIN 중의 하나인 LEFT OUTER JOIN을 사용하면 된다. 즉, 주소가 없는 강백호도 불러올 수 있다는 것이다. 이 때 조건과 상관없이 불러오고 싶은 테이블이 무엇인지에 따라 LEFT, RIGHT, FULL OUTER JOIN으로 나뉜다. 

Output
|firstName|lastName|state|city|
|:---:|:---:|:---:|:---:|
|강|백호|Null|Null|
|윤|대협|서울시|강남구|

&nbsp; &nbsp; 이것을 sql문으로 작성하면 다음과 같다.

``` sql
-- address 테이블의 personId와 person 테이블의 personId가 같은 것을 찾는다. 
-- address가 없는 person은 address 관련 컬럼이 null로 출력되어 나옴.
SELECT p.firstName, p.lastName, a.city, a.state 
FROM Person p
    LEFT OUTER JOIN address a
    ON p.personId=a.personId 
```

## 2. RIGHT OUTER JOIN
