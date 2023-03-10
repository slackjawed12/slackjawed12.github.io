---
layout: single

title: "[WIL] SOLID, 객체지향"
categories: til99
tag: [Java, oop, spring]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

## 1. SOLID 학습
 
항해 java 언어학습 주차 마지막 과제는 SOLID 원칙을 위배한 실습예제를 원칙에 부합하게 고치는 것이었다. 계산기 클래스가 주어졌는데, 사칙연산 부분을 Calculator 클래스 하나가 모두 담당하여 if - else if 분기로 처리하고 있었다. 이런 경우 어떤 식으로든 SOLID 원칙을 위배하게 된다. <br/>
이와 비슷하게, java 스터디 팀원들끼리 state pattern을 적용하여 자판기 클래스를 작성하는 연습을 했다.

## 2. 단일 책임 원칙 (SRP)

하나의 객체에는 하나의 책임만을 부여해야 한다는 원칙이다. 여기서 책임이라는 단어가 애매하게 다가오는데, Calculator 클래스에서는 '계산의 실제 수행'과 '사용자의 입력' 두 가지가 책임이라고 볼 수 있겠다. 즉 실제 수행 부분은 클래스를 나누어서 예를 들어 Add, Subtract, Multiply, Divide로 나누고, 입력부분의 검증은 Calculator가 하는 식이다.<br/>

Spring 프레임워크에서는 객체의 생성과 실제 Component를 분리하여 단일 책임 원칙에 부합하게 만든다. 즉, Configuration 클래스가 CompnentScan을 통해 Bean 객체들을 만들고, Controller, Service 등 여러 로직을 수행하는 클래스들은 의존관계에 따라 자신에게 정해진 일을 하면 된다.

또한, Bean Life Cycle에서 객체의 생성과 초기화는 분리되는데, 이 또한 SRP에 부합하는 설계로 볼 수 있다.

그런데 enum을 공부하면서 배민 개발자분이 작성하신 [Java Enum 활용기](https://techblog.woowahan.com/2527/)를 읽었는데, 여기서 상태와 행위를 하나의 Enum 클래스에 작성해서 처리하였다. 책임을 나누기/합치기 중 어떤 것이 더 이득인지 따져보는 것이 중요하겠다는 것을 배웠다.


## 3. 개방 폐쇄 원칙 (OCP)

객체는 확장에는 열려있어야 하고, 변경에는 닫혀있어야 한다는 원칙이다. 즉 기존 코드를 최대한 수정하지 않고 확장할 수 있도록 구성된 코드가 좋은 코드라는 것이다. 

Spring을 실습할 때는 interface를 먼저 작성하고 구현체들을 추가해나갔다. 예를 들어, DB에 연결되는 Repository 구현클래스를 작성하기 전에 Repository 인터페이스를 만들고, MemoryRepository 등 해당 인터페이스의 구현체들을 그 다음에 작성했다. 그 결과 나머지 모듈에 영향을 주지 않고 DB를 변경해서 Repository 클래스들을 추가할 수 있었다. 이런 과정에서 자연스럽게 다형성을 활용할 수 있었고, 이는 실습 코드가 OCP에 부합된 코드라고 볼 수 있었다.


## 4. 리스코프 치환 원칙 (LSP)

상위 모듈을 하위 모듈로 대체 했을 때 기능이 잘 돌아가야 한다는 원칙이다. 유명한 예제로 항상 언급되는 것이 직사각형 - 정사각형의 상속관계 문제이다. '정사각형은 직사각형이다'라는 명제가 참이라는 것을 알 것이다. 이 때 직사각형 클래스는 다음과 같이 작성할 수 있을 것이다.
``` java
class Rectangle {
    int width;
    int height;
    Rectangle(int width, int height) {
        this.width = width;
        this.height = height;
    }
    
    public void setWidth(int x) {
        this.width = x;
    }
}
```
여기서 정사각형 클래스를 작성하면 직사각형을 상속할 때의 바로 문제점을 알 수 있다. 먼저, 정사각형 클래스를 의도에 맞게 사용하려면 파라미터가 1개인 생성자를 사용해야 한다. 길이라는 속성 하나만 필요하기 때문이다. 그런데 직사각형을 직접 상속해버리면, 생성자도 오버라이딩 해야하므로 의도에 맞지 않는 파라미터 2개인 생성자를 사용해야된다. 


근데 상속이 두 클래스가 IS-A 관계일 때 상속이 가능하다는 것도 배웠다. 많이 드는 예시가 동물 클래스를 상속하는 개, 고양이 클래스 등이다. 고양이 IS A 동물이므로 상속이 성립한다는 것이다. 또한 수학적 논리로도 '고양이는 동물이다' 명제는 성립한다.

이 때 위의 직사각형-정사각형 클래스 예시가 보여주듯이, 리스코프 치환 원칙은 단순히 수학적인 논리로 성립하는 IS-A 관계만으로 상속을 해서는 안된다는 걸 보여준다.

## 5. 인터페이스 분리 원칙 (ISP)

큰 인터페이스는 작은 인터페이스로 분리하여 구현체가 인터페이스의 모든 기능을 활용할 수 있게 해야한다는 원칙이다. 만약 범용 인터페이스에 명시된 메서드를 구현클래스가 이용하지 않는 경우, 불필요하게 메서드를 오버라이드 하게 된다. 

## 6. 의존성 역전 원칙 (DIP)

객체는 추상화에 의존해야하고, 구현체에 의존하면 안된다는 원칙이다. 
