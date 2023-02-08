---
layout: single

title: "[Git] clone 실패 시 오류 해결 방법"
categories: git
tag: [git, error, https]
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
 
 원격 repository를 clone하려는데 다음 오류 메시지가 뜨면서 clone이 실패했다.<br/>
  
  > failed to connect to github.com port 443 after 21070 ms: couldn't connect to server.

 메시지 의미는 github.com의 https 포트인 443에 접속이 안 된다는 것이었다.<br/> 
 구글링 결과 git config --global 명령어로 proxy.https를 설정해야된다는데, proxy 환경을 쓰고 있지 않아서 다른 해결 방법을 찾아야 했다.<br/>


## 2. 해결 방법
 github에서 원격 repository의 주소를 <>code 에서 복사할 때 url 끝에 .git이 붙었는데, .git만 지우고 다시 clone했더니 잘 되었다.
 
 
## 3. 더 배울 점
 
 관련 내용을 찾다가 proxy, CA, SSL 등 보안 관련 여러 생소한 개념을 