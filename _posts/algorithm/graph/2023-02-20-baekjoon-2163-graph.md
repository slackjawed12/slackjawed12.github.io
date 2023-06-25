---
layout: single

title: "[백준][Java] 1058 - 친구"
categories: [algorithm, graph]
tag: [Java, graph]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

## 1. 문제 개요
[문제 링크](https://www.acmicpc.net/problem/1058) <br/>
 
그래프 구조가 명확히 보이는 문제여서, Java의 컬렉션으로 그래프를 구현해서 풀어보았다.<br/>
HashMap에 K V 쌍으로 Index와 인접리스트를 entry로 만들어 순회하도록 했다.<br/>
일단 문제 자체가 전체순회가 아니고 2번만 순회를 반복하면 됐기 때문에 무식하게 loop를 두 번 써서 풀었는데,
dfs로 count를 제한해서 푸는 것이 좋았을 것 같다.<br/>

## 2. 풀이 코드

무방향 그래프이므로 입력 시에 inner loop는 i+1부터 돌게 했고,
i, j를 대칭적으로 초기화했다.<br/>

``` java
HashMap<Integer, List<Integer>> graph = new HashMap<>();

// 무향 그래프 초기화
for (int i = 0; i < N; i++) {
    str = rd.readLine();
    for (int j = i + 1; j < str.length(); j++) {
        if (str.charAt(j) == 'Y') {
            graph.get(i).add(j);
            graph.get(j).add(i);
        }
    }
}
```

이후 graph.entrySet() 메서드로 그래프를 순회했는데, 코드가 꽤 더럽다.<br/>
핵심은 entrySet()으로 순회했다는 것..<br/> 
이제 이걸로 bfs, dfs 코드를 어떻게 짜야 할 지 생각해봐야한다.<br/>
가중치 그래프는 더 난관인데, 기존 컬렉션에만 의존해서 풀 게 아니라 Node 클래스를 새로 작성하는 것이 좋을 듯하다.<br/>

``` java
Set<Map.Entry<Integer, List<Integer>>> entrySet = graph.entrySet();
int max = 0;
for (Map.Entry<Integer, List<Integer>> entry : entrySet) {
    List<Integer> adj = entry.getValue();   // 각 node의 인접리스트
    boolean friend[] = new boolean[N];    // 갱신할 친구 정보
    friend[entry.getKey()] = true;        // 자기 자신은 친구가 아니므로 갱신
    int temp = 0;
    for (int next : adj) {
        if (!friend[next]) {
            temp++;
            friend[next] = true;
        }
        // next에 대해 리스트를 얻어서 또 한번 순회한다. 코드 같으므로 생략
    }
}
```