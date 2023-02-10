---
layout: single

title: "[IDE][PyCharm] html 파일에서 script가 작동하지 않을 때 해결 방법"
categories: ide
tag: [IDE, PyCharm, HTML, script]
# 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
  nav : "docs"
# search : false # 검색 시 결과에 나타날지 여부 결정

# 로컬 개발환경 설정 : slackjawed12.github.io 디렉터리 이동 후 bundle exec jekyll serve 명령어 실행
# 명령어에 나온 포트가 4000이면 localhost:4000 접속
---

## 1. 상황
 
 PyCharm 사용 중에 html 로컬 파일 url로 들어가 자바스크립트 작동을 테스트 했다.<br/>
 버튼에 onclick으로 script 태그에 선언된 함수를 호출하는 단순한 상황이었으므로 따로 로컬 서버를 띄우지 않아도 스크립트 자체는 당연히 동작해야 했다. 문법도 틀린 것이 없었다. 근데 버튼을 눌러도 아무 반응이 없었다.<br/>

## 2. 해결 방법
 로컬 서버를 띄우고, Bootstrap CDN 태그도 바꾸고 다 했으나 먹히지 않았다.<br/>

 아래 사진 빨간색 박스를 클릭하면 구문 분석을 하는데, 오류가 뜨는 곳을 수정하면 스크립트가 잘 작동한다. <br/>

 <img src="/assets/images/2023-02-07-pycharm-error-tooltip.jpg">

 일반적인 소스코드의 경우 문법 오류가 있으면 컴파일이 안 되어 오류가 금방 잡히는데, html의 스크립트는 문법 오류가 있어도 작동한다.<br/> 
 또, jquery를 이용할 때 html 파일에서 작성하면 인텔리센스 기능이 작동을 잘 안 한다. 단순 오타로 실수할 가능성이 높아진다.<br/>
 
 
## 3. 더 배울 점
 
 IDE는 밀접하게 상호작용하는 툴인 만큼, 단축키 및 여러 사용법에 빨리 익숙해져야한다.<br/> 
 오늘 프로젝트 중에 팀원들과 협업할 때 Git과 PyCharm을 연동하면서 문제가 많이 발생했고 이에 대한 해결책도 체계적으로 숙지해야한다.