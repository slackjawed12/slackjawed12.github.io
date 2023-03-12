---
layout: single

title: "[TIL] document.write()"
categories: til
tag: [JavaScript]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

## 1. 문제 상황

&nbsp; &nbsp; 게시글을 쓴다는 의미로 HTML button 태그의 onclick 함수를 write()로 정의했는데, 클릭할때마다 빈 화면만 출력했다. 

## 2. 난 무엇을 했는가?

&nbsp; &nbsp; 먼저, 서버쪽 메서드와 내장된 js 함수에 로그를 찍어봤다. 아무것도 출력되지 않았다. 개발자 화면을 봐도 요청 응답을 주고받은 내역이 없었다.

## 3. 해결책

구글링 해보니, onclick에서 write()를 호출하면 document.write()로 이미 정의되어 있는 함수가 호출된다. 함수 이름을 바꿨더니 의도한대로 아주 잘 실행되었다. 앞으로 예약어 잘 확인하고 함수 이름을 써야겠다..