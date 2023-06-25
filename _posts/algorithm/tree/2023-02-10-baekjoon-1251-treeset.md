---
layout: single

title: "[백준][Java] 1251 - 단어 나누기"
categories: codingtest
tag: [Java, substring, StringBuilder, TreeSet]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

## 1. 문제 개요
[문제 링크](https://www.acmicpc.net/problem/1251) <br/>
 
 1. String을 길이가 1 이상인 세 개의 substring으로 나눈다.
 2. substring들을 거꾸로해서 다시 하나의 String(reversed)으로 만든다.
 3. reversed를 모든 인덱스에 대해 구한다.
 3. reversed 중에서 사전 순으로 가장 앞선 문자열을 구한다.
 
 substring, StringBuilder, TreeSet 등 여러 API들을 혼합해서 풀어야 하는 문제였다.<br/>

 split이 delimiter를 기준으로 String을 잘라서 바로 배열을 주는 것처럼, 여러 인덱스 값이 주어질 때 한 번에 String 배열로 substring들을 주는 메서드가 있는 줄 알고 찾았는데 구글링 해봐도 없는 것 같다.<br/>
 
## 2. 풀이 코드 및 설명
 
 ``` java
 String x = br.readLine();
 TreeSet<String> set = new TreeSet<>();
 for (int i = 1; i < x.length()-1; i++) {
    for (int j = i + 1; j < x.length(); j++) {
        List<String> arr = new ArrayList<>();
        arr.add(x.substring(0, i));
        arr.add(x.substring(i, j));
        arr.add(x.substring(j));
        List<String> reversed = arr.stream().map(StringBuilder::new)
                        .map(StringBuilder::reverse)
                        .map(StringBuilder::toString)
                        .collect(Collectors.toList());
        set.add(reversed.stream().reduce(String::concat).orElse(""));
    }
 }
 System.out.println(set.first());
 ```

### 1) 문자열 나누기 - substring
 아래와 같이 substring을 세 번 적용하여 문제 조건에 만족하도록 했다.<br/>
 두 번째 인자가 들어갈 때, 해당 인덱스는 포함하지 않는다는 것을 주의해야 한다.<br/> 
 이 때문에 for loop의 조건식이 달라진다.<br/>

 ``` java
 arr.add(x.substring(0, i));
 arr.add(x.substring(i, j));
 arr.add(x.substring(j));
 ```
 
### 2) StringBuilder.reverse()
 먼저 arr의 substring들을 인자로 받아서 StringBuilder 클래스로 변환한다.
 그 다음 reverse 하고 다시 String으로 바꿔서(toString) List로 넘긴다.
 ``` java
 List<String> reversed = arr.stream().map(StringBuilder::new)
                        .map(StringBuilder::reverse)
                        .map(StringBuilder::toString)
                        .collect(Collectors.toList());
 ```

### 3) treeset의 저장
 사전 순서로 가장 먼저 등장하는 String을 구해야 하므로 set.first()를 출력한다. 가장 나중에 등장하는 것을 구하려면 set.last()를 이용하면 될 것이다.

## 3. 배운 것

### substring
 2개의 index만 필요하기 때문에 substring을 단순히 여러 번 써서 풀었는데, 주어지는 index값이 여러 개인 경우 처리 방식에 대해 생각해봐야한다.<br/>


### StringBuilder의 사용
 StringBuilder는 String을 받는 생성자가 오버로딩 되어있다. 객체를 이용해서 reverse 등 원하는 처리를 하고, toString으로 return해야한다.


### 성능?
 문자열 길이가 $l$일 때, 데이터 개수는 $O(l^{2})$이다. 일단 loop 안에서 객체 생성에 시간이 소요되고, substring이 $O(l)$, TreeSet의 Add가 $O(\log l)$이다. $O(l^{2}\log l)$ 정도로 성능이 나올 것 같다.


<br/>
<br/>
틀린 부분은 댓글 남겨주세요. 감사합니다.


