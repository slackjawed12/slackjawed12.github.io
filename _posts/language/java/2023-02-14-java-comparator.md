---
layout: single

title: "[Java] comparator 활용하기"
categories: java
tag: [Java, comparator, TreeMap, TreeSet, sort]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

## 1. 문제 상황
 
 문제를 풀다가 TreeMap의 자동으로 정렬되는 특성을 이용해서 문제를 풀려고 했는데, Key 기준 정렬이라 의도한대로 풀리지 않았다.<br/>
 그래서 Java에서 C++의 pair 개념에 대응하는 AbstractMap.SimpleEntry를 사용했다.<br/> 
 문제는 SimpleEntry\<K, V\>가 Comparable이 아니라서, TreeSet이나 TreeMap의 Key로 쓸 수 없다는 것이었다.<br/>
 
 List의 sort 메소드를 쓰거나, TreeMap, TreeSet의 요소가 되려면 해당 클래스는 Comparable\<T\>를 구현했거나 Comparator를 구현해야한다.<br/> 
 직접 해보니 Comparable의 구현과 Comparator의 구현은 작성에서 약간 차이가 있는데, 어찌됐건 둘 중 하나는 반드시 구현해야 한다.
 

## 2. Comparator 구현 클래스

### 구현 클래스 작성
아래는 AbstractMap.SimpleEntry\<Integer, Integer\> 타입의 Comparator를 구현한 FirstAscendingPair 클래스를 나타낸 것이다. Comparator 인터페이스의 구현 클래스는 int compare(T t1, T t2) 메소드를 구현해야 한다.<br/>
클래스의 이름 뜻대로, 먼저 Entry의 first 값(key)을 기준으로 오름차순 정렬 하고, 같으면 second 값(value) 기준으로 오름차순 정렬한다.

``` java
class FirstAscendingPair 
implements Comparator<AbstractMap.SimpleEntry<Integer, Integer>> {
     @Override
     public int compare(AbstractMap.SimpleEntry<Integer, Integer> o1,
                       AbstractMap.SimpleEntry<Integer, Integer> o2) {
        return !o1.getKey().equals(o2.getKey()) ? o1.getKey() - o2.getKey()
              : !o1.getValue().equals(o2.getValue()) ?
                 o1.getValue() - o2.getValue() : 0;
     }
}
```

### compare 메소드의 규칙

- compare(T t1, T t2)의 return값이 양수이면 t2가 t1 앞에 온다.
- compare(T t1, T t2)의 return값이 0이면 t1과 t2는 같다.
- compare(T t1, T t2)의 return값이 음수이면 t1이 t2 앞에 온다.

이 규칙을 바탕으로 compare 함수를 리턴값을 보자. 두 객체의 key값이 다르면 o1.getKey()-o2.getKey()를 리턴하며 이 값이 양수면 o1이 o2 앞인데, 차이가 양수라는 것은 o1이 o2보다 크다는 것이므로 o2가 앞에 오면서 오름차순이 구현된다. 이후 규칙은 value에 대해 동일하게 적용된다. 헷갈리면 빌드 내리고 다시 바꿔서 돌려도 될 듯 하다..

## 3. 컬렉션에서 Comparator 구현 클래스 사용하기

### 리스트

먼저 리스트에서 사용법을 보면, pairList.sort() 메소드처럼 Comparator가 필요한 메소드의 내부에 구현 클래스의 인스턴스를 넣어주면 된다.
방법 1은 구현 클래스를 명시적으로 작성한 뒤 new 연산자로 넣은 것이고,
익명 구현 객체를 바로 넣어주거나 람다식을 사용해도 된다.

``` java
List<AbstractMap.SimpleEntry<Integer, Integer>> pairList=new ArrayList<>();

pairList.add(new AbstractMap.SimpleEntry<>(1, 3));
pairList.add(new AbstractMap.SimpleEntry<>(1, 7));
pairList.add(new AbstractMap.SimpleEntry<>(4, 2));
pairList.add(new AbstractMap.SimpleEntry<>(3, 1));
pairList.add(new AbstractMap.SimpleEntry<>(7, 9));
pairList.add(new AbstractMap.SimpleEntry<>(4, 5));

// 구현 클래스 인스턴스를 인자로 준다.
pairList.sort(new FirstAscendingPair());
System.out.println("pairList output : " + pairList);

// 익명 구현 객체를 넣어준다. 이번엔 key, value 모두 내림차순
pairList.sort(new Comparator<AbstractMap.SimpleEntry<Integer, Integer>>() {
   @Override
   public int compare(AbstractMap.SimpleEntry<Integer, Integer> o1, 
                     AbstractMap.SimpleEntry<Integer, Integer> o2) {
         return !o1.getKey().equals(o2.getKey()) ? o2.getKey() - o1.getKey()
               : !o1.getValue().equals(o2.getValue()) ? o2.getValue() - o1.getValue() 
               : 0;
      }
});

// 람다식으로도 작성할 수 있다. 타입 추론 덕분에 코드가 간단해진다.
pairList.sort((o1, o2) -> 
               !o1.getKey().equals(o2.getKey()) ? o2.getKey() - o1.getKey()
               : !o1.getValue().equals(o2.getValue()) ? o2.getValue() - o1.getValue()
               : 0);
```

### TreeMap과 TreeSet에서 Comparator 사용

리스트에서의 동작 규칙과 유사하다. 생성자에 구현 클래스를 넣어준다는 차이만 있다.

``` java
TreeSet<AbstractMap.SimpleEntry<Integer, Integer>> pairSet 
            = new TreeSet<>(new FirstAscendingPair());

TreeMap<AbstractMap.SimpleEntry<Integer, Integer>, String> pairMap
            = new TreeMap<>(new FirstAscendingPair());
```

Comparable에 대해서는 더 알아보고 다음에 작성해야겠다.