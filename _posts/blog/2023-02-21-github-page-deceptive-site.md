---
layout: single

title: "[Github Page] 블로그가 크롬에서 사기성 사이트로 뜰 때(미해결)"
categories: blog
tag: [jekyll, blog]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

## 1. 문제 상황

[문제의 url](https://slackjawed12.github.io/codingtest/baekjoon-1271-biginteger/)
블로그의 여느 글과 다를 것 없는 평범한 백준 문제풀이 페이지였다.<br/>
그런데 이상한것이 이놈만 클릭했다하면 시뻘겋게 사기성 사이트라며 주의를 주는 것이었다.<br/>
크롬 브라우저 배경을 빽빽한 빨간색으로 가득하니 공포심이 절로 들었다.



크롬이 아닌 다른 브라우저(edge)에서는 이상이 없었다.<br/>


결국 원인을 찾아내지 못해, 급하게 해당 페이지의 url만 바꾸는 수습만 대충 해놓았다.<br/>
근데 언제 또 이렇게 사기성 사이트로 누명을 씌울 지 알 수 없는 노릇이라 답답하다.<br/>

일단 해당 페이지는 다음과 같은 요소가 있었다. <br/>

- 백준 문제 링크
- gist 코드 스니펫 링크 
- "엄청난 부자2" 라는 제목(?)
- 수식

뭐가 잘못됐던 걸까? 당장 이런 자질구레한 것들을 수정한다고 이미 찍힌 낙인이 없어질 것 같진 않았다. 그래도 혹시 몰라서 잠재적 위험 요소들(?)을 제거한 뒤 url을 수정하여 올렸다.

## 2. 누명에 벗어나기 위한 시도

지푸라기라도 잡는 심정으로 아래 링크에 가서 구글에게 잘못이 없음을 읍소했다.<br/>

[피싱 경고 오류 신고](https://safebrowsing.google.com/safebrowsing/report_error/?hl=ko)


