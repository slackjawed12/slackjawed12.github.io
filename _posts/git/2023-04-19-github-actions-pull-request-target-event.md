---
layout: single

title: "[Github Actions] pull_request_target로 CI 이벤트 발생시키기"
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
 
&nbsp; &nbsp; 이번 프로젝트에서는 Organization 리포지토리를 만들고 해당 리포지토리를 팀원들이 각각 개인 계정으로 fork해서 PR을 merge하는 식으로 협업 프로세스를 구축해놨다. 그런데 Github Actions의 이벤트 설정을 잘못해서인지 개인 계정 리포지토리에서도 Action이 작동했고, 이후에 Organization 리포지토리에서 Action이 작동했다.   
&nbsp; &nbsp; 개인 계정의 리포지토리에서는 Action이 실패할 수 밖에 없었는데, secret 설정이 없어서 빌드 과정에서 테스트가 실패했기 때문이었다. 어쨌든 secret 설정들은 Organization 리포지토리에만 넣어뒀기 때문에 개인계정의 action들은 실패했지만, 불필요한 빌드 한번을 거쳐야 했으므로 배포를 기다리는 시간이 길어졌다. 아래는 기존의 workflow yaml 파일이다.

``` yaml
on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
```
&nbsp; &nbsp; 이렇게하면 개인 계정 main 브랜치에서 Organization의 main 브랜치에 PR을 날릴때까지 작동하는 action은 총 3개이다. 먼저 개인 계정 리포지토리의 main 브랜치에 push 이벤트가 발생했으므로 1개, 개인 계정 리포지토리에서 pull_request가 발생해서 해당 커밋으로 이벤트 1개(따라서 개인 계정 리포지토리 브랜치 이름이 나타난다), 마지막은 Organization 리포지토리 pull_request를 merge할 때 발생하는 push 이벤트이다.   
&nbsp; &nbsp; 즉 push 조건만으로 2개의 액션이 추가적으로 발생하기 때문에, push 조건 없이 액션을 돌려야 했고, 자신이 pull request를 날리는게 아니라 받아야 했으므로 pull_request는 쓸모가 없는 상황이다. 이 때, push 조건 없이 Organization 리포지토리의 파일들만 액션을 돌게 하는 방법이 pull_request_target 옵션이다.


## 2. pull_request_target

&nbsp; &nbsp; 아래처럼 작성하면 Organization 리포지토리가 받은 PR이 closed 되고, merge까지 이뤄질 때 action이 작동하게 된다.

``` yaml
on:
  pull_request_target:
    branches:
      - main
    types: [closed]

jobs:
  deploy:
    name: Deploy
    if: github.event.pull_request.merged == true
    runs-on: ubuntu-latest
    ...
```

