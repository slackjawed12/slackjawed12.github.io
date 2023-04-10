---
layout: single

title: "[Git] github 협업 - organization 만들어서 작업하기"
categories: git
tag: [github, organization, branch]
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
 
 이번 Spring 주특기 백엔드 토이 프로젝트에서는 github에서 제공하는 Organization 기능을 활용해보려고 했다. 먼저 Organization에 repository를 만들고, 팀원 각자 계정으로 해당 repository를 fork해서 작업하는 환경을 만들려고 했다. Organization에서 자신이 원하는 기능을 실험할 때는 branch를 새로 만들어서 개인 로컬 pc에서 바로 작업할 수 있어서 좋았고, 최종 반영시에는 pull request 과정을 거치기 때문에 실수로 충돌하는 문제에서 자유로웠다.

 처음 이렇게 작업할 때는 Organization repo와 개인 계정 repo가 헷갈려서 헤맸다.

## 2. 작업 flow

### 초기 세팅
 
 먼저 팀원들과 협의해서 폴더 구조와 .gitignore에 들어갈 파일들을 선정했다. application.properties 같은 파일들은 db 연결 시 암호화되지 않은 비밀번호를 적고, jwt 시크릿 키 역시 적어야 하기 때문에 .gitignore에 포함시켰다.
 
 근데 폴더 구조를 만들 때 폴더나 패키지 하위 항목이 비어있으면 아예 원격 repo에 반영이 되질 않는 문제가 생겼다. 그래서 dummy 클래스들을 하위항목에 만들어놓고 나중에 삭제하는 식으로 해결했다..

 또한, 아래와 같이 로컬에서 작업할 때 공용 repo를 upstream으로 지정해줘야 했다.  
 
 git remote add upstream 'url'

 IDE에서 제공하는 remote control에서 직접 url을 추가해도 된다. 이렇게 하면 공용 repo에서 바로 pull을 받아올 수 있다.

### branch 작업 ~ Pull Request

 branch는 github 웹사이트에서 organization repository 주소로 들어가서 담당자가 만들거나, 각자 만들 수 있었다. 그리고 아래와 같이 pull을 받으면 공용 repo의 dev 브랜치 내용으로 작업을 시작할 수 있었다.   
 
 git pull upstream dev

 자신이 작업중인 파일이 있다면 이전에 git stash, git add를 진행한 후에 pull을 받으면 된다.

### merge

merge 과정은 자신이 관리자라면 터미널로 직접 공용 repo의 branch로 checkout해서 하는 방법이 있고, github 웹사이트에서 간단히 하는 방법이 있다. 일단 권한 오류가 해결되지 않아 github 사이트에서 하는 방법으로 merge 하고 있는데, 매번 웹사이트를 방문하는 것도 귀찮기 때문에 오류를 해결해야할 것 같다.

  
 
## 3. Issue 발행과 branch
 
 github에서 발행된 issue에 대해서 organization의 관리자는 branch를 새로 만들 수가 있다. change branch source를 누르면 main 뿐만 아니라 dev나 다른 branch에서 새로운 branch를 만들어서 issue와 관련된 작업을 할 수 있다.
