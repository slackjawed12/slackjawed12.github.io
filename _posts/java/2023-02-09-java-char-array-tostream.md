---
layout: single

title: "[Java] char 배열을 stream으로 바꾸기"
categories: [java]
tag: [Java, string, chars]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: false # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

## 1. 문제 상황
[문제 링크](https://www.acmicpc.net/problem/1264)

위 문제를 풀 때, AEIOU 모음들은 HashSet으로 저장하고 입력받은 String은 toUpperCase로 변환한다.<br/>
이후 Character 배열을 받아서 HashSet에 저장되어 있는지 여부만 확인하여 모음 개수를 세려고 했다.


## 2. 풀이 코드
 
 ``` java
 List<Long> ans = new ArrayList<>();
 String str;
 while(!(str=br.readLine().toUpperCase()).equals("#")) {
        ans.add(Arrays.stream(str.chars()
                                .mapToObj(x -> (char)x)
                                .toArray(Character[]::new))
                .filter(set::contains).count());
 }

 ans.forEach(System.out::println);
 ```

### str.chars() ??
 String의 chars()는 String을 IntStream으로 변환해주는 메소드이다. 각 Integer의 값은 대응되는 아스키 코드 값이다.<br/>
 이후 mapToObj()에서 (char) 형으로 타입변환 하고, Arrays.stream().toArray()로 최종적으로 Stream<Character>가 되어 String을 변환할 수 있다.


## 3. 배운 것
 문자열에 대한 연산이 필요할 때 str.chars()와 (char) 형 변환을 기억하고 있어야겠다.<br/>
 string의 toUpperCase는 알파벳에만 적용되고, 나머지 아스키코드에 대해서는 영향이 없다.<br/>
 또, filter(x -> set.contains(x)) 역시 filter(set::contains)로 간단하게 표현된다.
