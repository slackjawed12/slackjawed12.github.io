---
layout: single

title: "순열(Permutation) 재귀 구현"
categories: algorithm
tag: [Java, Permutation, DFS, Recursion]
# 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
  nav : "docs"
# search : false # 검색 시 결과에 나타날지 여부 결정

# 로컬 개발환경 : slackjawed12.github.io 디렉터리 이동 후 bundle exec jekyll serve 실행
# 명령어에 나온 포트가 4000이면 localhost:4000 접속
---

&nbsp; &nbsp; 순열(Permutation)은 대상을 순서에 따라 나열할 때 나올 수 있는 모든 경우의 집합을 말한다. python 같은 경우 itertools 라이브러리의 permutations를 사용하면 순열의 결과가 나온다. Java는 직접 구현해야 하는데, 결국 핵심은 DFS이다.  
&nbsp; &nbsp; 먼저 반환타입이 List<List<Integer\>>인 재귀함수로 구현하여 API처럼 호출했을 때 리스트를 받을 수 있도록 했디. 이후 파라미터를 줄인 버전으로 고쳐보고 성능 차이를 비교해보았다. 결론부터 얘기하면 성능 차이는 없었다. 

## 1. 순열의 재귀 구현
&nbsp; &nbsp; 논의를 간단히 하기 위해서 1부터 N까지의 자연수 $n$개에서 $r$개를 뽑는 순열의 집합을 구하는 것으로 가정했다.


재귀로 구현하면 다음과 같다.

```java
public List<List<Integer>> permutations(int N, int M) {
  return solve(N, M, new int[N + 1], new ArrayList<>(), new ArrayList<>());
}
public int permutation(int n, int r) {
  if(n == r || r == 0)  {
    return 1;
  } else {
    return combination(n - 1, r - 1) + combination(n - 1, r);
  }
}
```

## 2. 파라미터가 없는 버전
&nbsp; &nbsp; 이제 4개 중에서 2개를 뽑는 경우의 수가 6개임은 위의 combination(4, 2)를 이용해서 확인할 수 있다. 그런데, 실제 조합 자체를 뽑아내고 싶다면 combination만으로는 부족하다. 즉, 6개라는 수가 아니라 (1, 2), (1, 3), (1, 4), ... (3, 4)의 6개 순서쌍이 필요하면 조합을 뽑아줄 다른 함수가 필요하다는 것이다. 대부분의 문제는 이렇게 특정 배열로부터 조합을 뽑아내거나, 조합들을 배열에 집어넣는 등 조합으로부터 특정 조작이 따라오게 된다.

## 3. 성능 비교

&nbsp; &nbsp; 조합 경우의 수를 구했을 때와 유사하게, 직관적인 관점에서 재귀를 구현하는 과정이다. list는 조합을 뽑을 대상 리스트, store는 뽑은 조합을 저장해둘 리스트로 설정했다. 그리고 현재까지 뽑은 대상의 수를 d, list에서 뽑을 대상의 위치를 i, 뽑는 대상의 수를 r로 두었다. n은 list.size()로 대체했다. 사실 d는 필요 없는 매개변수인데, 의미를 명확히 하려고 두었다.   
&nbsp; &nbsp; 대상의 위치를 list 끝까지 확인해서 뽑거나 안뽑는 경우로 조합 재귀문을 작성한다. 이는 백트래킹에서 자주 발생하는 패턴인데, 일단 의사결정(decision)이 끝난 것과 아직 남은 것을 구분한다. 우리가 다룰 조합에서는 store 리스트가 의사결정이 끝난 것이고, list와 i값을 이용해서 아직 의사결정이 남은 것을 표현한다. 그리고 재귀문은 흔히 Choose - Explore - Unchoose 패턴이라는 방식으로 구성한다.

```java
// d : 현재 뽑은 대상 수(depth), i : 대상의 위치(index), r : 뽑을 대상의 수
public void combi1(List<Integer> list, List<Integer> store, int d, int i, int r) {
  if (r == 0) {
    store.forEach(x -> System.out.print(x + " "));
    System.out.println();
  } else if (i != list.size()) { 
      store.add(list.get(i));   // 뽑는다 (Choose)
      combi1(list, store, d + 1, i + 1, r - 1); // 뽑은 경우 나머지 조합을 구한다(Explore)
      store.remove(d);  // 뽑은걸 뺀다 (Unchoose)
      combi1(list, store, d, i + 1, r); // 안 뽑은 경우 나머지 조합을 구한다
  }
}
```
&nbsp; &nbsp; list를 (1,2,3,4,5,6)으로 초기화하고 3개를 뽑아서 함수를 돌려보면, 조합 결과는 (1 2 3) 부터 (4 5 6)까지 20개가 출력된다. 카운트 변수를 넣고 매 호출마다 횟수를 세보면 83번이 나온다.

### 속도를 개선한 버전 - combi2
&nbsp; &nbsp; combi1의 아쉬운 점은 조합을 구해봐야 의미가 없는 상황에도 combi1를 호출한다는 것이다.  
&nbsp; &nbsp; 예를 들어, i의 위치가 5인데 하나도 안뽑아서 d가 0인 상황을 생각해보자. 5, 6을 다 뽑아도 조합이 완성되지 않는데, 호출 가능한 조건이 list의 끝까지 가는 것이니 어쨌든 i가 끝까지 도달하게 된다. 조건문을 바꿔서 이를 개선해보자.

```java
public void combi2(List<Integer> list, List<Integer> store, int d, int i, int r) {
  if (r == 0) {
    store.forEach(x -> System.out.print(x + " "));
    System.out.println();
  } else if (r <= list.size() - i) {  // 개선
      store.add(list.get(i));
      combi2(list, store, d + 1, i + 1, r - 1); 
      store.remove(d);
      combi2(list, store, d, i + 1, r);
  }
}
```
