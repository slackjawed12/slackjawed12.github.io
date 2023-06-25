---
layout: single

title: "[Java] StringBuilder 활용하기"
categories: java
tag: [Java, StringBuilder]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

## 1. StringBuilder

&nbsp; &nbsp; 문자열을 다룰 때 쓰는 String 클래스는 immutable이기 때문에 문자열 수정 등의 작업을 하려면 코드 자체도 불편하고, 억지로 한다고 해도 성능도 좋지 않다. 이럴 때 StringBuilder 클래스를 사용하면, 편하고 빠르게 문자열 연산을 처리할 수 있다. 알고리즘 문제를 풀 때나, 문자열을 처리해서 작업을 해야할 때 요긴하게 쓸 수 있다.  
&nbsp; &nbsp; 참고로, multi thread 환경에서는 StringBuffer를 써야한다.

## 2. StringBuilder 사용 방법

### StringBuilder 생성
&nbsp; &nbsp; 먼저 아래와 같이 StringBuilder 객체를 생성해야 한다. 기본 생성자는 처음 capacity가 16인 상태로 생성된다. buffer overflow가 일어나는 순간 자동으로 더 큰 버퍼 사이즈를 할당한다. 실제로 실험해보면 capacity는 2배로 늘어난다. 불필요한 사이즈 할당 과정을 없애고 싶으면 초기 버퍼를 적당히 큰 값으로 주면 된다.    
&nbsp; &nbsp; 문자열과 함께 생성하는 방법도 있다. 이 때 capacity는 초기화 문자열의 길이 + 16이다. 이렇게 생성된 Stringbuilder 인스턴스는 파라미터로 전달받은 문자열을 초기값으로 갖고 시작한다.

```java
StringBuilder sb = new StringBuilder();   // capacity 16
StringBuilder sb = new StringBuilder(4096);   // capacity 4096
StringBuilder sb = new StringBuilder("abc");   // capacity 19
```

### toString
&nbsp; &nbsp; StringBuilder의 toString 메서드는 편집이 마무리 된 문자열, 즉 Buffer 내부 문자열을 String 객체로 변환한다.

### append
&nbsp; &nbsp; append는 문자 하나를 기존 문자열 뒤에 붙이는 연산이다. 여러 타입으로 오버로딩 되어있다.

```java
StringBuilder sb = new StringBuilder("abc");
sb.append(1);    // "abc1"
sb.append("12345"); // "abc12345"
```

### insert
&nbsp; &nbsp; insert는 offset 값과 삽입할 대상을 파라미터로 전달하면 offset 위치에 값을 삽입한다. 문자열 길이에서 벗어나면 StringIndexOutOfBoundsException이 발생한다. 메서드를 보면 내부에서 System.arrayCopy를 사용한다. 마찬가지로 Object로 오버로딩 되어있어 여러 타입을 쓸 수 있다.

```java
StringBuilder sb = new StringBuilder("abc");
sb.insert(0, "x") // "xabc"
sb.insert(0, 3) // "3xabc"
```

### delete, deleteCharAt
&nbsp; &nbsp; delete, deleteCharAt은 범위, 혹은 특정 위치의 문자를 삭제한다. delete(start, end)는 범위 삭제인데, start는 include, end는 exclude이다. 특이한 것은 end 값이 문자열의 길이를 넘어도 예외가 발생하지 않고, 마지막 위치까지 지운다.   
&nbsp; &nbsp; deleteCharAt(index)는 index 위치의 문자 하나를 삭제한다. 범위를 넘의면 예외가 발생한다.

```java
StringBuilder sb = new StringBuilder("abcdefg");
sb.delete(1, 4) // "aefg"
sb.delete(1, 10) // "a"
sb.deleteCharAt(5) // Exception

StringBuilder sb = new StringBuilder("abcdefg");
sb.deleteCharAt(5) // "abcdeg"
```

### reverse

&nbsp; &nbsp; StringBuilder 내의 문자열을 거꾸로 만든다.

```java
StringBuilder sb = new StringBuilder("abc");
sb.reverse();     // "cba"
```

## 3. 사용 예시
&nbsp; &nbsp; 알고리즘 문제 중 문자열을 수정해야 하는 경우 많이 사용한다. 혹은 답을 String으로 제출해야 할 때도 사용한다. 아래는 StringBuilder를 적용해본 문제이다.

[LeetCode 345번](https://leetcode.com/problems/reverse-vowels-of-a-string/)