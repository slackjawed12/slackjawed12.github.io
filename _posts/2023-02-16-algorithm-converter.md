---
layout: single

title: "[Java] 서로 다른 진법을 환산해서 더하기"
categories: algorithm
tag: [Java, algorithm]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

## 1. 문제 상황
[문제 링크](https://www.acmicpc.net/problem/2530) <br/>
 
시간이 초(second) 단위로 주어질 때 시간, 분, 초 단위로 계산하는 단골 문제이다.<br/>
이 문제를 풀면서 진법 환산에 대한 일반화를 생각해보았다.<br/>
예를 들면, 10000 시간은 몇년, 몇개월, 며칠, 몇 시간인지 계산할 수도 있을 것이다.<br/>

## 2. 코드
 
먼저, 각 단위에 해당하는 진법을 HashMap에 index : radix 쌍으로 저장한다.<br/>
1개월을 30일로 가정하여 month는 12진법, day는 30진법, hour는 24 진법으로 설정한다.<br/>

``` java
int[] arr = {0, 0, 0};
HashMap<Integer, Integer> radixMap = new HashMap<>();
        radixMap.put(0, 12);
        radixMap.put(1, 30);
        radixMap.put(2, 24);
        // 시간, 분, 초 단위면 (0, 24) (1, 60) (2, 60) 으로 저장
```

다음 loop를 통해 설정된 진법에 따라 소요 시간을 해당 단위의 진법에 맞게 덧셈한다.

``` java
// cost : 소요 시간(ex. 10000시간)이 들어간다.
int cost = Integer.parseInt(rd.readLine());

for (int i = arr.length - 1; i >= 0; i--) {
    int radix = radixMap.get(i);
    
    // carry로 넘어온 cost를 더한다
    arr[i] += cost;

    // 다음 index의 cost는 현재 radix로 나눠서 carry로 넘긴다
    cost = arr[i] / radix; 

    // 현재 단위는 진법에 맞게 modulo 연산으로 마무리 해준다
    arr[i] %= radix;
}

System.out.print(cost+" ");
for (int x : arr) {
    System.out.print(x + " ");
}
// 결과 : 1 1 26 16
// 10000시간은 1년 1개월 26일 16시간이다
```

cost까지 출력하면 carry로 초과된 연 단위까지 출력된다.<br/>
시간 문제가 나올때마다 매번 찜찜하게 풀었는데, 이걸로 어느 정도는 정리 되는 것 같다.<br/>