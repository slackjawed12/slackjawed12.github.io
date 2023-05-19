---
layout: single

title: "[WIL] 실전 프로젝트 4주차 회고 - 모니터링 구축"
categories: til99
tag: [WIL]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

## 1. 4/23 ~ 4/29 회고

&nbsp; &nbsp; 4주차의 주제는 모니터링 시스템의 구축이었다. 기존에는 에러가 발생하면 WAS가 출력하는 로그를 일일이 less 명령어로 확인했다. 이렇게 로그 하나하나의 상세 정보를 찾아내는 작업도 필요하지만, 전체적인 에러의 경향성을 확인할 시스템이 중요했다. 어떤 api에서 요청이 많은지, 에러는 얼마나 발생하고 있는지 등 메트릭을 수집해서 한 눈에 파악할 필요가 있었다.

## 2. 모니터링 시스템 아키텍처
&nbsp; &nbsp; 아래와 같은 아키텍처로 모니터링 시스템을 구축했다. 욕심을 더 부리고 돈이 더 많았다면, 서버 하나를 더 구축해서 해당 서버를 모니터링 전용으로 세팅했을 것 같다. Pinpoint-apm, Scouter 등 다른 도구도 후보군에 있었지만 비용문제나 설정 시간 문제등으로 제외했다.
![monitoring-architecture](https://github.com/Teamthirteenseven/chillisauce-BE/assets/77224652/37c26591-507d-4bdd-8711-756d2108c09e)


## 3. Actuator, Prometheus, Grafana

&nbsp; &nbsp; Prometheus, Grafana를 현재 돌아가고 있는 EC2 인스턴스에 설치해서 모니터링 시스템을 구축했다. 먼저 build.gradle에 Actuator를 추가하고, prometheus를 지원하는 micrometer 의존성을 추가했다.

## 4. 보안 문제
&nbsp; &nbsp; 기본 세팅으로만 모니터링 시스템을 구축하면, 엔드포인트가 노출되기 때문에 보안에 취약하다는 문제가 있다. 이를 해결하기 위한 방법은 여러가지가 있었다.  
&nbsp; &nbsp; 첫 번째는 Prometheus가 서버 엔드포인트에 요청할 때, Authorization 헤더에 Bearer 토큰을 사용하는 것이었다. 이는 이번 프로젝트의 Filter 레이어에 JwtAuth를 처리하는 부분이 있었기 때문에 떠올린 방법이었다. Prometheus가 클라이언트로서 요청할 때 토큰이 없으면 403에러 때문에 메트릭을 수집하지 못한다. 공식 문서를 찾아보면 yaml 설정파일에 Bearer 토큰을 추가해서 요청을 보내는 법이 나와있었다. 해당 방법으로 403 에러는 피했지만, 문제는 WAS로부터 Access 토큰을 발급받기 때문에 2시간 정도면 다시 403이 발생했다. 2시간마다 토큰을 다시 받도록 api를 구현하기도 했는데, 문제는 이렇게 자동으로 토큰을 발급받으면 결국 보안 문제가 발생하기 때문에 의미가 없었다. 물론 로컬호스트 간 통신이기 때문에 크게 상관 없지 않나 싶긴 했는데.. 어쨌든 이 메트릭 수집 하나 때문에 api를 하나 새로 파는건 너무 과한 작업이었다.
&nbsp; &nbsp; 그래서 애초에 metrics 엔드포인트는 로컬호스트에서 요청할 때 filter를 다 통과하는 식으로 Security Configuration에서 설정했다.  

## 5. 결과
&nbsp; &nbsp; Alertmanager까지 사용해서 위험한 지표가 급격히 상승하는 경우(CPU 사용량, 500에러 발생 비율 등), Slack 알람이 발생하도록 설정했다. 팀원들을 초대해서 같이 슬랙 알람을 보고 서버 문제를 파악할 수 있었다.

