---
layout: single

title: "[WIL] 항해99 OT주차 풀스택 미니 프로젝트 - 너강내강"
categories: til99
tag: [Git, 크롤링, sessionStorage]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

## 1. 기획
 
 강아지의 견종별로 코멘트 게시판이 있어서, 자신이 키우는 강아지에 대한 코멘트를 남기면 다른 사람들의 코멘트를 볼 수 있는 서비스로 기획하였다. <br/> 
 
 회원은 로그인하면 견종별 게시판 링크로 들어갈 수 있었는데, 이 때 상단부의 소개글과 이미지를 웹사이트에서 크롤링해와서 그리는 것으로 했다.<br/>

 크롤링 할 사이트를 보니 견종이 300여개가 넘어가서, 아래에 언급할 성능 문제도 있고 해서 일단 사람들이 많이 키우는 대표적인 10여 종의 강아지들만을 주제로 코멘트 게시판 페이지를 만들기로 했다.<br/> 

 그리고 이 대표종들은 main.py에 리스트를 만들어 추가, 관리하는 것으로 대강 정리했다. 서버가 올라갈 때마다 대표종은 DB에 수정되어 올라간다(update의 upsert 이용)<br/>

## 2. 진행

### 문제1) 기획 의도의 파악
 
 이전과 달리 컨셉 기획이 확실히 있었기 때문에, 의도와 맞게 구현을 하고있는지 방향성을 계속 체크해야 했다.<br/> 그러다 보니 내가 짜고 있는 코드가 실제 의도와 맞지 않게 구현하고 있는것도 있었다(크롤링 부분 등). <br/>

### 문제2) 크롤링의 성능 - beautifulsoup
 일단 html에서 selector를 찾아 크롤링을 해야 했는데, 문제는 대상 웹사이트가 견종을 크기별로 초소형, 소형, 중형, 대형, 초대형으로 분류하고 있었다.<br/> 
 분류별 페이지에 들어가면 다시 총합 300종에 달하는 견종의 \<a\> 태그 링크들이 있었고, 또 이 링크를 들어가서 이미지와 소개글을 따와야 했다.<br/>
 결국 base url을 포함해서 미련하게 2중 for loop를 작성하고 크롤링을 했다.<br/>
 이는 무지막지한 성능 저하로 이어졌다. 푸들, 말티즈, 골든 리트리버 세 종의 이미지와 소개글을 html에 그려내는데 2분 가까이 걸렸다.<br/>

### 일단 DB에 넣어버리기
 
 아무래도 이 5개의 분류링크에서 크롤링을 시작해서 300여개의 링크에서 또 크롤링 한 결과를 html에 건네주는 것은 답이 아닌 것 같았다..<br/> 
 url 전용 컬렉션을 만들어 크롤링 결과를 넣어두고 써먹었다. 필요하면 url 필드에서 값을 받아 해당 url에서 크롤링을 하는 것으로 일단락을 지었다.<br/>

### 세션스토리지
 API상 강아지 이름을 url로 건네주어야 했으므로 팀장님이 세션 스토리지로 강아지 이름을 저장하자고 했다. 처음 들어보는 개념이라 구글링해서 공부했고 내가 구현한 부분에서 이를 저장할 수 있도록 수정했다. 

### Git의 효율적인 사용
 stash, add를 적절히 이용하니 pull, push 과정에서 거의 충돌없이 깔끔하게 git을 사용할 수 있었다.

## 3. 해결하지 못한 문제

### 소개글의 크롤링 
 웹사이트의 \<p\> 태그들을 대상으로 견종 소개글을 크롤링 했는데, 문제는 그 안의 \<div\> 태그에 소개글을 넣은 견종도 있어서 가져오면 빈 문자열이 출력되었다.<br/> 다른 우선순위가 높은 문제들이 여럿 있어서 이는 시간 문제상 해결하지 못했다.<br/>
 (영정사진 같아보이는 흑백사진, 코멘트 작성, 토큰 검증 등..)

### DB의 구성?
 저번에도 그렇고 이번 역시 DB의 효율적인 구성에 대한 자문을 할 수 밖에 없었다. 이번엔 계층구조 DB를 사용했는데, user 컬렉션이 comments 배열 필드를 가지는 방식이었다. 기획 상 user는 견종 하나 당 한 개의 comment만 작성 가능했으므로 수정, 삭제에도 문제가 없었다.
 
