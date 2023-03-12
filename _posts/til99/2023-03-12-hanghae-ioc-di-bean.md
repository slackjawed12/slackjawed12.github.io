---
layout: single

title: "[WIL] IOC, DI, Bean"
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

## 1. 스프링 프레임워크에서 IOC, DI

&nbsp; &nbsp; 스프링 프레임워크를 학습할 때 가장 먼저 중요하게 다루는 것이 제어의 역전(IoC)과, 의존성 주입(DI)이다. 과정을 간단히 말하면 객체 간 의존성을 주입하는 과정에서 제어의 역전을 이용하는 것이다. 결론은 Spring 프레임워크는 두 개념을 이용해서 SOLID 원칙을 최대한 지키는 설계가 가능해졌고, 객체지향 프로그래밍의 장점을 실제 개발 과정에서도 살려낼 수 있다는 것이다.

### 의존성 주입

&nbsp; &nbsp; 어떤 객체가 다른 객체에 의존한다는 것은 특정 기능을 위해 그 객체를 사용하거나 속성을 알고있어야 한다는 것과 같다. 이를테면, Service 객체는 데이터베이스와의 연결 역할을 맡은 Repository 객체에 의존하여 데이터를 가져와서 처리를 해야한다. 실제 코드 상으로는 의존하는 객체가 필드로 들어가 있을 때가 많다. MemoryRepository가 Repository 인터페이스의 구현 클래스라고 할 때, Service 객체는 아래와 같이 Repository에 의존한다.

```java
public class UserService {
    private final Repository repository;

    public UserService(){
        this.repository = new UserRepository();
    }
}
```

&nbsp; &nbsp; 문제는 이렇게 구현 클래스에 직접 의존하면 데이터베이스의 환경이 바뀌었을 때 Service 객체의 코드를 변경해야 하므로, 개방 폐쇄 원칙을 지킬 수 없다. 이 자체로 의존성 역전 원칙을 위반하고 있기도 하다. 이는 책임의 측면으로 봤을 때, Service가 Repository 객체를 생성하는 책임까지 지고 있는 것에 원인이 있다. 해결방법은 Config 클래스를 따로 설정하여 객체 생성의 책임을 부여하고, 객체 간 의존성을 설정하는 것이다.

```java
public class UserService implements Service {
    private final Repository repository;

    public UserService(Repository repository){ // 인터페이스에만 의존
        this.repository = repository;
    }
}

public class UserRepository implements Repository {}

public class Config {    // 실행 시 가장 먼저 호출되어 객체를 생성함
    public Service service() {
        return new UserService(repository());
    }

    public Repository repository(){
        return new UserRepository();
    }
}
```

&nbsp; &nbsp; 이제 데이터베이스의 변경 등이 생기면 Config 클래스의 repository 메서드만 변경하면 된다.

### 제어의 역전(IoC)

&nbsp; &nbsp; 흔히 Spring Framework가 돌아가는 환경을 IoC 컨테이너라고도 한다. 위에서 Config를 통해 의존성을 주입하는 과정에서 결과적으로 제어의 역전이 일어나게 된다. 처음에 UserService는 자신이 의존하는 Repository 클래스의 생성자를 직접 호출하고 원하는 동작을 실행했다. 반면 Config 클래스가 객체 생성의 역할을 담당한 이후에는, UserService는 실제로 어떤 Repository 구현 객체가 들어올지 모르는 상태로 구현된 비즈니스 로직을 수행한다.<br/>
&nbsp; &nbsp; 이는 의존성 주입에 따라 프로그램 제어의 흐름을 외부 Config 클래스가 책임지고 있기 때문에 발생한 일이다. 


## 2. Spring Bean?
&nbsp; &nbsp; 실제 Spring 프레임워크에서는 순수 java 코드로 Config 클래스를 설정할 일은 많지 않다. Config 역할을 담당하는 클래스에는 간단히 @Configuration 어노테이션을 붙여 프레임워크가 어노테이션을 바탕으로 개발자가 원하는 동작을 수행할 수 있도록 한다. 이렇게 스프링의 IoC 컨테이너에 등록되는 객체들을 Bean 이라고 한다. Bean에는 Configuration으로 등록된 Config 객체도 포함된다. 그 외에 Service, Repository의 구현체들 모두 @Bean 어노테이션이나 @Component 어노테이션을 활용하면 컨테이너에 Bean으로 등록되어 컨테이너 상에서 관리된다.