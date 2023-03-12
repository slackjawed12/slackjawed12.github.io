---
layout: single

title: "[WIL] HTTP 메시지와 스프링 MVC"
categories: til99
tag: [Java, HTTP, spring]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

## 1. HTTP 메시지의 구성

&nbsp; &nbsp; 클라이언트와 서버가 80번(혹은 443번) 포트로 통신하는 경우, 각각 HTTP, HTTPS 프로토콜에 따라 요청/응답 메시지를 주고 받게 된다. 먼저 대략적인 요청, 응답 메시지의 구성을 숙지해야겠고, 데이터 요청/응답 방식, HTTP 프로토콜의 고유 특성인 무상태성, 비연결성 등을 정확히 이해하는 것이 중요하다.

### 요청 메시지

&nbsp; &nbsp; 요청 메시지는 아래 예시와 같이 start line, 헤더, 공백 한 줄, 메시지 바디로 구성된다. 헤더는 크게 Host 정보를 포함한 Request headers, 메시지에 대한 정보를 담은 Representation headers로 분류한다.

> POST /member/login HTTP/1.1 &nbsp;&nbsp;&nbsp; (start line) <br/>
> Host: mypage.com &nbsp;&nbsp;&nbsp; (Request headers) <br/>
> Accept: text/html, application/json, ... <br/>
> Content-Type: application/json &nbsp;&nbsp;&nbsp; (Representation headers) <br/>
> -공백- (CRLF) <br/>
> Message Body

&nbsp; &nbsp; 이런 요청 메시지에 데이터를 담아 서버로 보내는 방식에는 크게 세 가지가 있다.

1. 쿼리 파라미터
2. Message Body에 쿼리파라미터 저장해서 보내기
3. Message Body에 Text, XML, JSON 등의 형식으로 보내기(JSON이 대세임)

&nbsp; &nbsp; 어떤 방식으로 데이터를 받느냐에 따라서, 프레임워크에서 지원하는 처리 방식도 약간씩 달라지게 된다. 

### 응답 메시지

&nbsp; &nbsp; 응답 메시지도 start line, 헤더, 공백 한 줄, 응답 메시지 바디로 나뉜다. 응답 메시지의 start line에는 method가 아닌 Status Code가 들어간다. Code에는 200, 300(Redirect) 400, 500 등 여러가지가 있다. 헤더는 요청 메시지와 비슷하게 Response headers, Representation headers로 분류한다.

> HTTP/1.1 200 OK (start line) <br/>
> Content-Type: text/html; charset=utf-8 <br/>
> Etag: "----" <br/>
> Last-Modified: ---- <br/>
> -공백- (CRLF) <br/>
> Message Body

&nbsp; &nbsp; 응답 메시지에 데이터를 담아 클라이언트에 보내는 방식도 세 가지로 나눌 수 있다.

1. 정적 파일 - html, 이미지 등
2. html 동적 렌더링
3. JSON, XML 등

&nbsp; &nbsp; 동적 렌더링, 즉 서버 사이드 렌더링을 하는 경우 템플릿 엔진(스프링 프레임워크의 경우 Thymeleaf)으로 Model 객체에 저장된 데이터를 클라이언트에게 보낼 수 있다. 렌더링이 필요하지 않고, JSON이나 XML 등 텍스트 자체에 데이터를 담아 전송하는 경우 스프링 프레임워크는 컨트롤러에서 @ResponseBody 등으로 string을 직접 전송하는 방식을 이용한다.

### HTTP 주요 특성 - 무상태성(Stateless)

&nbsp; &nbsp; HTTP의 대표적인 특성으로 항상 꼽히는 것이 무상태성이다. 이는 서버가 클라이언트의 상태를 보존하지 않는다는 것이다. 예를 들면 어떤 클라이언트가 웹툰 서비스 화면에 들어갔다고 했을 때, 서버는 해당 클라이언트가 웹툰 서비스에 들어갔다는 정보를 저장하지 않는다. 웹툰 서비스의 특정 웹툰을 보고 싶으면, 클라이언트는 서버에게 웹툰 서비스 + 특정 웹툰의 정보 두 가지를 모두 서버에게 요청해야 한다. 물론 클라이언트가 서비스를 활용하려면 이런 정보들이 api로 제공되어야 한다.<br/>
&nbsp; &nbsp; 로그인 등 상태 유지가 요구되는 서비스가 필요하다면 쿠키, 세션 등의 방식으로 상태를 유지하기도 하는데, 이는 HTTP의 기본 특성은 아니며 HTTP의 기능을 확장해서 활용한 것에 가깝다. 

### HTTP 주요 특성 2 - 비연결성(Connetionless)

&nbsp; &nbsp; HTTP는 기본적으로 연결을 유지하지 않는다. 이는 클라이언트가 요청을 보낸 뒤 서버가 응답을 해서 한번 주고받은 이후에는 해당 연결을 지속하지 않는다는 것이다. 이 특성 때문에 요청을 보낼때마다 TCP/IP 연결을 다시 해야한다는 것이므로, 하나의 클라이언트가 요청을 자주하는 경우 약간의 성능 저하가 발생한다. 이는 HTTP/2, HTTP/3에서 최적화를 해서 많이 해소된 상태라고 한다.

## 2. Spring MVC

&nbsp; &nbsp; 스프링 프레임워크의 MVC도 Model-View-Controller를 의미한다. Controller는 요청 메시지의 유효성을 검증하거나 공통된 로직을 처리하고, View는 클라이언트에게 보낼 데이터를 처리하는 역할을 한다. Model은 Controller가 데이터를 저장하고, View에서 그 데이터를 참조할 수 있도록 중간 매개물 역할을 한다.<br/> 
&nbsp; &nbsp; 스프링은 각 요소의 확장성을 보장하기 위해 많은 것들을 인터페이스로 만들었다. 이를테면, 컨트롤러의 경우 Argument로 예전 방식인 Servlet을 받을 수도 있고, 개발 과정에서 만든 클래스를 객체로 받아서 Model에 저장할 수도 있다. 이처럼 Spring은 컨트롤러가 다양한 인자를 받을 수 있도록 기능을 제공한다.

### Dispatcher Servlet

### Handler Adapter

### Argument Resolver

### Return Value Resolver

### HTTP Message Converter

### ModelAndView, Model

### ViewResolver