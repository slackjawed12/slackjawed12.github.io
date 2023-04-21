---
layout: single

title: "[MySQL][LeetCode] 196. Delete Duplicate Emails"
categories: [sql, mysql]
tag: [SQL, DELETE, subquery]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

[문제 링크](https://leetcode.com/problems/delete-duplicate-emails/)
join에 group by를 적용한 subquery를 작성하여 풀었다.

## 1. 문제 개요

&nbsp; &nbsp; email 컬럼 중 값이 2개 이상 나타나는 email을 삭제해야 하는데, 삭제 조건은 id가 가장 작은 레코드를 남기고 나머지 중복 이메일은 삭제해야 한다는 것이다.

Input

|id|email|
|:---:|:---:|
|1|a@b.xx|
|2|c@d.xx|
|3|a@b.xx|
|4|a@b.xx|


Output

|id|email|
|:---:|:---:|
|1|a@b.xx|
|2|c@d.xx|


## 2. 풀이 - subquery + group by

&nbsp; &nbsp; 먼저 from subquery로 다음과 같은 view를 만들려고 했다. 즉, 이메일 컬럼을 unique하게 만들고 해당 이메일을 갖는 id 중 최솟값을 대응시킨다.

View

|min_id|email|
|:---:|:---:|
|1|a@b.xx|
|2|c@d.xx|

&nbsp; &nbsp; email을 기준으로 구분해야 했으므로 group by email을 적용하고, id는 최솟값을 남겨야 하므로 min(id)를 사용했다. 마지막으로 view의 min_id와 레코드의 id가 다른 행들을 삭제해주었다.

``` sql
delete p 
from Person p
join (
    select min(id) as min_id, email 
    from Person group by email) d
    on p.email = d.email
where p.id!=d.min_id
```

## 3. 다른 풀이 - Cartesian Product

&nbsp; &nbsp; 조건 없는 join으로 cartesian product를 만들어 풀면 짧은 sql문으로 풀이가 가능하다.

``` sql
delete p1 from person p1,person p2 
where p1.email=p2.email and p1.id>p2.id;
```

&nbsp; &nbsp; cartesian product로 아래와 같은 테이블이 만들어진다.

|id|email|id|email|
|:---:|:---:|:---:|:---:|
|1|a@b.xx|1|a@b.xx|
|1|a@b.xx|2|c@d.xx|
|1|a@b.xx|3|a@b.xx|
|1|a@b.xx|4|a@b.xx|
|2|c@d.xx|1|a@b.xx|
|2|c@d.xx|2|c@d.xx|
|2|c@d.xx|3|a@b.xx|
|2|c@d.xx|4|a@b.xx|
|3|a@b.xx|1|a@b.xx|
|3|a@b.xx|2|c@d.xx|
|3|a@b.xx|3|a@b.xx|
|3|a@b.xx|4|a@b.xx|
|4|a@b.xx|1|a@b.xx|
|4|a@b.xx|2|c@d.xx|
|4|a@b.xx|3|a@b.xx|
|4|a@b.xx|4|a@b.xx|

&nbsp; &nbsp; 여기서 이메일이 같고 p1의 id가 p2 아이디보다 큰 것들은 다음과 같다.

|id|email|id|email|
|:---:|:---:|:---:|:---:|
|3|a@b.xx|1|a@b.xx|
|4|a@b.xx|1|a@b.xx|
|4|a@b.xx|3|a@b.xx|

&nbsp; &nbsp; delete p1 이므로 해당 조건에 맞는 row가 Person에서 삭제된다.