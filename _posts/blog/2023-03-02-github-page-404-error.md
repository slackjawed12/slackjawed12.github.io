---
layout: single

title: "[Github Page] 404 에러 해결방법"
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

결론부터 얘기하면 url 설정에 /을 일관되게 붙이지 않았기 때문이다.. 아래는 삽질의 기록이다.<br/>

## 1. 문제의 배경 - 카테고리 세분화

깃허브 포스트가 점점 쌓이다보니, 큰 주제 내에서도 다루는 주제가 많아져서 세분화가 필요했고, url도 분리할 필요가 생겼다. 먼저 아래와 같이 navigation.yml에 카테고리를 나눠 url을 할당했다. Java 카테고리에 children으로 Stream을 두었다.

```markdown
<!-- navigation.yml -->
docs:
  - title: "Java"
    url: /categories/java/
    children:
      - title: "Stream"
      <!-- 끝에 / 붙임 -->
        url: /categories/java/stream/
  
  - title: "SQL"
    url: /categories/sql/
    children:
      - title: "MySQL"
        url: /categories/sql/mysql/
```
그리고 자식 카테고리에 해당하는 md파일을 만들어 아래와 같이 archive 페이지로 설정했다.

```markdown
<!-- category-java-stream.md -->
---
title: "Stream"
layout: archive
<!-- 얘는 끝에 / 안 붙임. 로컬에서는 되는데 원격에선 404 -->
permalink: /categories/java/stream 
<!-- 생략 -->
---

{% assign posts = site.categories.stream %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}
```
즉, /categories/java 에 들어가면 java 카테고리에 해당하는 글이 모두 보이게 하고, /categories/java/stream은 java 카테고리 중 stream에 대한 글만 보이도록 하려는 의도였다. 그리고 로컬에서 띄웠을 때 아주 잘 작동했다.

## 2. 문제 상황

문제는 push 이후 원격 origin 서버에서 똑같은 url로 들어가면 404가 떴다. 일단 404 에러는 url에 해당하는 페이지가 없으니까 다른 url을 입력하라는 것이었는데, 눈 크게 뜨고 찾아봐도 오타는 없었다. 아니 로컬에서는 되는데 왜?


## 3. 시도 방법들과 해결

시도 1 : origin 브랜치 이름이 main 이었는데, master로 바꿔봤다. <br/>
시도 2 : 무작정 기다리기. 당연히 안 됐다.<br/>
시도 3 : _site 디렉터리 내용을 원격 repo에 push하기<br/>
repo도 난잡해지고 뭔가 해결책이 아닌 것 같다는 직감이 들어 실제로 하진 않았다.

사실 두 번째 시도 이후 무작정 기다리며 2주 정도 보내다가, http 공부도 좀 하고 url도 눈에 익숙해질 때 즈음 다시 url을 쳐다봤다. 404가 크리티컬하지는 않았기 때문에..

그러다 url에 '/'을 붙여보니 됐더라는 글을 발견하였는데, 내 md파일도 permalink로 등록한 url의 끝에 '/'가 없었다. 그리고 붙였더니 아주 잘 작동한다.

로컬에서 돌아가는데 서버에서 안되니까 환장할 노릇이었는데 어쨌든 해결했다. 로컬은 왜 /를 안붙여도 되고, 서버에서는 왜 꼭 붙여야할까?.. 





