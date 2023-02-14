---
layout: single

title: "[WIL] 항해99 OT주차 사전 토이 프로젝트"
categories: til99
tag: [Git, jwt, Jinja2]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

## 1. 기획
 
 강사 소개 및 강의 리뷰 웹페이지를 제작해보는 것이 기획이었다.<br/>
 실제 강사나 강의를 url로 연결해서 실제로 서비스하는 것은 아니었다.<br/> 
 등록된 강사를 소개하는 페이지를 구성하고, 로그인, 회원가입, 강의 리뷰 CRUD 등 바탕이 되는 기능을 구현하는 데에 초점을 맞췄다.<br/>
 

### API

 메인페이지, 강사소개, 회원가입, 로그인, 리뷰작성 등 페이지는 5개로 정리되었다. 기존에 작성된 리뷰는 GET으로 조회했다. 리뷰 작성, 수정, 삭제를 각각 url을 다르게 했는데, REST API 구현에 대한 전반적인 규칙을 먼저 알았다면 시행착오가 적었을 것 같다.


### DB의 구성
 
 [mongoDB](https://www.mongodb.com/)를 사용했다. user 컬렉션은 아이디, 패스워드(hashlib으로 암호화되어 저장), 닉네임으로 필드를 구성했다. review 컬렉션은 강사, 닉네임, 작성날짜, 별점, 코멘트 내용 등 총 5가지 필드로 구성됐다. 


  
## 2. 진행 중 문제점

### 작업 파일의 분리
 실습 때는 app.py로만 진행해서 모든 코드를 app.py 하나에 다 작성했다.<br/> 
 이 역시 flask의 [blueprint](https://flask-docs-kr.readthedocs.io/ko/latest/blueprints.html) 라이브러리를 활용했다면 해결할 수 있었다.<br/> 
 문제점을 인식하고 'flask 파일 분리' 등으로 구글링을 몇번 해봤으나 적용할만한 엄두는 나지 않았다.<br/> 
 당장 기능 구현에 급급해서 '나중에 리팩토링해야지'라는 안일한 마음을 갖게되었다.<br/>
 이는 아래에 언급할 Git의 conflict 문제 뿐만 아니라 역할 분담 자체가 애매해져서 작업이 지지부진해지는 결과로 이어졌다.

### Git

 협업으로 새로 branch를 만들어 써본 것이 처음이었다.<br/> 
 .gitignore 항목을 제대로 작성해놓지 않아서, push 할 때마다 개인설정파일들이 conflict를 일으켰다.<br/>
 conflict 해결하는데 지쳐서 구글링 해보니 [gitignore.io](https://toptal.com/developers/gitignore)처럼 각자 개발환경에 맞는 .gitignore를 제공해주는 웹사이트도 있었다. PyCharm-All 항목을 push하고 pull 했더니 아예 인터프리터가 작동하지 않아 롤백했다.<br/>
 결국 제출 때까지 해결하지 못했다.


## 3. 로그인, 회원가입

### jwt
 팀원 중 한 명이 회원가입 구현 과정에서 hashlib 라이브러리를 써서 password를 암호화했다.<br/> 
 github에 직전 기수분들의 코드가 있었고, 코드 한줄한줄마다 어떤 의미인지 상세한 주석이 있어서 jwt의 개념을 코드와 함께 구글링하며 공부할 수 있었다.<br/> 
 PyJWT 패키지를 설치해서, login 페이지에서 POST 요청을 하면 서버에서 토큰을 받아 클라이언트의 cookie로 저장하는 식으로 간단히 구현했다.<br/>
 브라우저의 개발자 도구(F12) 화면에서 토큰값을 볼 수 있었고, [jwt.io](https://jwt.io/)에서 값을 확인했다.<br/>


## 4. 템플릿 엔진의 활용

### jinja2
 안 그래도 자바스크립트 문법이 익숙하지 않아서 script function 작성할 때 작동하지 않을 때가 많았다.<br/>
 선배들 코드 복붙하다보니, html 파일에 중괄호를 두번 겹쳐서 변수이름을 적는 이상한 문법들이 보였다.<br/> 간단한 if, for loop로 html을 갖다 붙이는 모양새였다.
 'flask html 중괄호 두개' 이런 식으로 구글링하니 Jinja2 템플릿 사용법을 잘 정리한 블로그가 많이 나왔다.<br/>
 
 서버 측에서 render_template 결과로 값을 넘겨주어서 간단한 조건분기들로 html을 붙일 수 있었고, 이 변수들을 script 함수에서도 써먹을 수 있었다.

## 5. 리뷰 수정, 삭제

토이 프로젝트 전반에 걸쳐 흥미로운 질문거리를 많이 남겨준 파트였다.

### 문제 - 수정, 삭제의 조건
 수정, 삭제 버튼이 잘 구현되었지만, 자신이 쓴 글만 수정, 삭제 가능해야한다는 조건이 없어서 이를 구현하고 싶었다.<br/>
 DB의 user, review 컬렉션은 나눠져 있었고, user의 nickname과 review의 nickname 필드는 중복되었다.<br/>
 일단 nickname 필드를 POST해서 DB에 update_one 쿼리를 날려야 하는데, 같은 강사에 대해 여러 리뷰를 작성할 수 있었으므로, 뭐가 수정 될 지 알 수 없었다.<br/>

 그래서 떠올린 해법은 review 레코드의 primary key를 클라이언트에 넘겨주고 각 버튼마다 ObjectId값을 저장시키는 것이었다.<br/>
 이 ObjectId를 넘긴 후 다시 받아오는 것은 꽤 험난한 여정이었다. 프로젝트가 거의 마감될 즈음에서야 겨우 구현했다.

### bson, ObjectId 
 mongoDB의 ObjectId값은 string이 아니어서, 따로 str로 변환시켜줘야했다.<br/> 
 변환하지 않고 그냥 넘기면 Serializable하지 않다고 계속 TypeError가 났다.<br/>
 여차저차 string으로 변환하는 법을 찾아서 button의 onclick 함수의 인자로 ObjectId의 string을 넘겼다.<br/> 
 이번엔 콘솔에도 잘 찍히는 string이 아무리 클릭해도 반응하지 않았다.<br/>
 찾아보니 string 변수가 parameter로 들어갈 때는 문자열로 처리해야 돼서 \\'${arg}\\' 형식으로 전해줘야 했다..<br/>
 마지막으로 클라이언트가 보내준 string을 서버에서 받을 때는 다시 ObjectId로 변환시켜야 했으므로, bson 라이브러리를 활용했다.<br/>
 이 과정 끝에 다음 코드로 게시물을 수정할 수 있었다. <br/>

 ``` python
 from bson import ObjectId
 update_one({'_id':ObjectId(id_receive)}, {'$set':{'comment':comment_receive}})
 ```

 삭제는 쿼리만 다르게 하고 앞의 과정과 동일하게 처리했다.