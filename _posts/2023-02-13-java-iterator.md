---
layout: single

title: "[Java] Map, Set의 순회 방법 정리"
categories: java
tag: [Java, iterator, map, set]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

## 1. 사용 상황
[문제 링크](https://www.acmicpc.net/problem/1032) <br/>
 
 HashSet으로 각 String의 인덱스에 해당하는 Character를 저장하고, Set의 크기가 1이면 문자 그대로, 1이 넘어가면 와일드카드인 물음표를 concat 하는 식으로 풀이했다.<br/>
 근데 HashSet에서 값을 어떻게 꺼내오는지 까먹어서 iterator에 대한 개념을 다시 정리했다.<br/>

## 2. 코드
 
 ``` java
 HashSet<Character> set = new HashSet<>();
 for (String str : strings) {
    set.add(str.charAt(i));
 }

 Iterator<Character> iter = set.iterator();
 ans = set.size() == 1 ? ans.concat(iter.next().toString())
                        : ans.concat("?");
 ```
 
 위 문제는 iterator의 next()만 써도 되므로 간단하므로, 순회의 의미는 없다.<br/>
 unordered 컬렉션인 Set, Map에서 iterator를 어떻게 사용해야하는지 정리한다.<br/>

### Set 컬렉션의 순회 - Iterator

다음과 같이, Set 컬렉션은 iterator() 메서드로 직접 iterator를 건네서 set 전체를 순회할 수 있다. 아니면 advanced for loop를 쓰면 된다.

``` java
 Iterator<Character> iter = set.iterator();
 
 while(iter.hasNext()) {
    System.out.println("element : " + iter.next());
 }

 // advanced for를 사용하면 iterator 없이 순회가 가능하다.
 for(Character ch : set) {
    System.out.println("ch : " + ch);
 }
```

### Map 컬렉션의 순회 - entrySet, keySet

왜 C++ 처럼 직접 iterator로 순회하지 못하는지 모르겠다. 이 때문에 꽤 불편한데, 어쨌거나 핵심은 Java에서는 Map을 순회하려면 entry나 key를 타입으로 하는 set을 먼저 얻은 다음 순회해야 한다. <br/> 

#### entrySet()
 
 Key, Value가 각각 Long, String인 map에 대해 다음처럼 entrySet을 구할 수 있다.
 이후에는 set에서 전체 순회하는 방식과 동일하다. 즉, 직접 for loop 돌리든지 iterator를 선언해서 hasNext(), next()로 순회하든지 선택하면 된다.

``` java
 Map<Long, String> map = new HashMap<>();
 
 Set<Map.Entry<Long, String> entries = map.entrySet();

```
 
#### keySet()
 keySet()은 key에 대해서만 set을 구성한다. key의 타입과 맞게 set 객체를 할당하면 된다.
 이후 value는 map.get(key)로 구하거나, iterator를 선언한다면 entrySet()과 동일한 방식으로 순회하면 된다.
``` java
 Map<Long, String> map = new HashMap<>();
 
 Set<Long> keySet = map.keySet();
 
 // map.get(key)로 value를 구해서 순회한다.
 for(Long key : keySet){
    System.out.println("key : " + key + ", value : " + map.get(key));
 }

 // iterator로 순회한다. 어쨌든 map.get(key)로 value를 구하는건 동일하다.
 Iterator<Long> iter = map.keySet().iterator();
 while(iter.hasNext()) {
    Long key = iter.next();
    String value = map.get(key);
    System.out.println("key : " + key + ", value : " + map.get(key));
 }
```