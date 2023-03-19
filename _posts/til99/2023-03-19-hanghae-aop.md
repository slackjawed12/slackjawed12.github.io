---
layout: single

title: "[WIL] 6주차 Spring Framework의 AOP"
categories: til99
tag: [Java, spring]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

## 1. 회고 개요

&nbsp; &nbsp; 이번 주차에서는 기존에 구현한 블로그 서비스에 Spring Security 모듈을 추가해서 필터를 통한 검증 처리와, ControllerAdvice를 이용한 예외처리 로직을 추가했다. 이전부터 Service 객체에 Jwt를 검증하는 로직이 모든 메서드에 중복되어 불편했고, 예외처리 부분 역시 따로 처리되어 있지 않아 500에러를 발생시켰고, 응답 메시지도 들어있지 않았다. Security Filter와 Exception Handler를 이용해서 이런 문제들을 해결할 수 있었다.

## 2. Spring Security와 Authorization, Authentication

&nbsp; &nbsp; Spring Security의 아키텍처 상 인증 및 인가의 로직은 웹 MVC에 앞서서 별개로 진행된다. 즉, 요청 메시지에 대한 정보가 Dispatcher Servlet을 통과하기 전에 여러 개의 Filter로 구성된 부분에서 요청 메시지를 검증한다.  
&nbsp; &nbsp; 먼저 프로젝트에서 Jwt, Session 등 유저를 인증하는 방식을 결정하고,  결정된 방식에 따라 Custom Filter를 구현한다. 이후 SecurityConfig 클래스에 해당 Filter를 등록해서 사용할 수 있다.
&nbsp; &nbsp; SecurityConfig 클래스에서는 서버의 인증 로직에 대한 몇몇 기본 설정에 대한 것들을 Bean으로 등록하여 사용한다. 이를테면 Password 암호화 방식, Filter Chain의 구성 방식, 인증 없이 허용할 url 등을 초기화한다.

## 3. Exception

&nbsp; &nbsp; 개인 실습 프로젝트에서는 GlobalExceptionHandler를 따로 만들어 해당 클래스 안에 ResponseEntity를 반환하는 방식으로 간단히만 구현했다. 
&nbsp; &nbsp; 이번 토이 프로젝트에서 팀원이 Custom Exception 클래스 하나를 구현하고, 상태코드와 메시지 정보를 담은 enum인 ExceptionEnum을 활용하여 Exception Handler를 구현했는데 예외처리가 훨씬 편했다. 앞으로 이렇게 활용하면 편할 것 같다.

## 4. AOP가 뭐지?

&nbsp; &nbsp; 인증, 인가 및 예외처리는 정확한 의미에서 AOP는 아닌 것 같은데 관점에 따라 MVC 웹과 따로 구현되어 작동하는 로직들이었다. 좁은 의미에서 Spring AOP는 Bean 호출 앞뒤에서 작동하는 로직들을 실행하는 것 같은데, 활용 이유와, 유지보수 측면의 장점을 체감할 수 있었다.