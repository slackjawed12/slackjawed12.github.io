---
layout: single

title: "[Linux] iptables 명령어 포트포워딩 적용 안될 시 해결 방법"
categories: linux
tag: [linux, iptables]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

## TL;DR

&nbsp; &nbsp; 리눅스 ubuntu 환경에서 포트포워딩이 적용되지 않으면 아래 절차를 거치면 된다.

- ifconfig, 혹은 ip addr 명령어로 NIC 이름 확인하기 (eth0, ens5 등 배포판에 따라 여러 가지 있음)
- 아래 포트포워딩 명령어 실행
``` bash
iptables -A PREROUTING -t nat -i ens5 -p tcp --dport 80 -j REDIRECT --to-port 8080
```

## 1. 문제 상황

&nbsp; &nbsp; Amazon EC2 ubuntu 20.04, t3.medium 인스턴스 환경에서 다음과 같이 포트포워딩을 해놨다.

``` bash
iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080
```

&nbsp; &nbsp; 그리고 curl 테스트 결과 connection refused가 떴다. 

## 2. 인스턴스 인바운드, 아웃바운드 규칙 확인 
 
&nbsp; &nbsp; 먼저 EC2 인바운드 규칙을 확인했다. 80, 8080 모두 열려있었다. 저번에 아웃바운드 규칙에 제한을 걸어두는 바람에 안 된 적도 있었는데, 아웃바운드 규칙은 모두 열려있었다.

## 3. iptables 정책 목록 확인 후 삭제 - 추가
&nbsp; &nbsp; 아래 명령어로 목록을 확인했다.
``` bash
iptables -t nat -L PREROUTING --line-numbers
```

&nbsp; &nbsp; 그 다음 출력된 line number를 통해 아래와 같이 정책을 삭제했다.
``` bash
iptables -t nat -D PREROUTING 1
```

&nbsp; &nbsp; 그런데 어차피 오타없이 잘 추가되었던 정책들이라 해결은 되지 않았다.

## 4. 명령어 변경 : eth0 -> ens5

&nbsp; &nbsp; 문제는 아래 명령어의 eth0 부분이다. 

``` bash
iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080
```

&nbsp; &nbsp; 당연하겠지만 EC2는 인스턴스 유형마다 NIC 이름이 다를 수 있다.. 즉, 자주 사용하던 프리티어의 경우 eth0였지만 새로 구입한 t3.medium은 ip addr 명령어로 확인해보니 이름이 ens5였다.. 그래서 eth0만 ens5로 변경하여 포트포워딩이 잘 작동되는 것을 확인했다.