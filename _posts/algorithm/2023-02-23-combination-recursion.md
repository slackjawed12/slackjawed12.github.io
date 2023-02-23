---
layout: single

title: "조합론 재귀 구현 정리"
categories: algorithm
tag: [Java, 조합론, 재귀]
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

$ n$개 대상에서 $r$ 개를 뽑아 나열하는 모든 경우의 수들은 재귀적으로 구현할 수 있다.<br/>
항상 백트래킹, dfs 개념을 적용해서 반복문을 적용한 재귀로 풀어왔는데, 이참에 깔끔히 정리해야겠다.

## 1. 조합 - 경우의 수
일단 조합의 경우의 수부터 살펴보자.<br/>
뽑을 것이 없으면 경우가 1가지이고, $n$개에서 $n$개를 뽑아야 하면 이것도 경우가 1가지이다.<br/>
그 외에는, $r$개 중에 하나를 포함시키거나, 포함시키지 않는 경우이다.<br/>
즉, 포함시킨다면 $n-1$개에서 $r-1$개를 뽑는 것이고, 포함시키지 않으면 $r$개를 뽑아야 한다.<br/>
위의 표현은 말로 표현해서 길지만 조합 경우의 수를 직관적으로 설명한다. 이를 수식으로 나타내면 다음과 같다.<br/>

$$ f(n,r) = 
\begin{cases}
1 & (r=n \; {\rm or} \; r=0) \\
f(n-1, \; r-1)+f(n-1, \; r)
\end{cases} $$

재귀로 구현하면 다음과 같다.

```java
public int combination(int n, int r) {
  if(n == r || r == 0)  {
    return 1;
  } else {
    return combination(n - 1, r - 1) + combination(n - 1, r);
  }
}
```

## 2. 조합

이제 4개 중에서 2개를 뽑는 경우의 수가 6개임은 위의 combination(4, 2)를 이용해서 확인할 수 있다. 
그런데, 실제 조합 자체를 뽑아내고 싶다면 combination만으로는 부족하다. 즉, 6개라는 수가 아니라 (1, 2), (1, 3), (1, 4), ... (3, 4)의 6개 순서쌍이 필요하면 조합을 뽑아줄 다른 함수가 필요하다는 것이다. 대부분의 문제는 이렇게 특정 배열로부터 조합을 뽑아내거나, 조합들을 배열에 집어넣는 등 조합으로부터 특정 조작이 따라오게 된다.

### 재귀 구현

조합 경우의 수를 구했을 때와 유사하게, 직관적인 관점에서 재귀를 구현하는 과정이다.<br/> 
list는 조합을 뽑을 대상 리스트, store는 뽑은 조합을 저장해둘 리스트로 설정했다. 그리고 현재까지 뽑은 대상의 수를 d, list에서 뽑을 대상의 위치를 i, 뽑는 대상의 수를 r로 두었다.<br/> 
n은 list.size()로 대체했다. 사실 d는 필요 없는 매개변수인데, 의미를 명확히 하려고 두었다.<br/>
대상의 위치를 list 끝까지 확인해서 뽑거나 안뽑는 경우로 조합 재귀문을 작성한다.<br/>
이는 백트래킹에서 자주 발생하는 패턴인데, 일단 의사결정(decision)이 끝난 것과 아직 남은 것을 구분한다. 우리가 다룰 조합에서는 store 리스트가 의사결정이 끝난 것이고, list와 i값을 이용해서 아직 의사결정이 남은 것을 표현한다.<br/>
그리고 재귀문은 흔히 Choose - Explore - Unchoose 패턴이라는 방식으로 구성한다.

```java
// d : 현재 뽑은 대상 수(depth), i : 대상의 위치(index), r : 뽑을 대상의 수
public void getCombi(List<Integer> list, List<Integer> store, int d, int i, int r) {
  if (r == 0) {
    store.forEach(x -> System.out.print(x + " "));
    System.out.println();
  } else if (i != list.size()) { 
      store.add(list.get(i));   // 뽑는다 (Choose)
      getCombi(list, store, d + 1, i + 1, r - 1); // 뽑은 경우 나머지 조합을 구한다(Explore)
      store.remove(d);  // 뽑은걸 뺀다 (Unchoose)
      getCombi(list, store, d, i + 1, r); // 안 뽑은 경우 나머지 조합을 구한다
  }
}
```
list를 (1,2,3,4,5,6)으로 초기화하고 3개를 뽑아서 함수를 돌려보면, 조합 결과는 (1 2 3) 부터 (4 5 6)까지 20개가 출력된다.<br/>

### 속도의 개선
getCombi의 아쉬운 점은 조합을 구해봐야 의미가 없는 상황에도 getCombi를 호출한다는 것이다.<br/>
예를 들면, i의 위치가 5인데 하나도 안뽑아서 d가 0인 상황을 생각해보자. 5, 6을 다 뽑아도 조합이 완성되지 않는데, 호출 가능한 조건이 list의 끝까지 가는 것이니 어쨌든 i가 끝까지 도달하게 된다. 조건문을 바꿔서 이를 개선해보자.


```java
public void getCombiImproved(List<Integer> list, List<Integer> store, int d, int i, int r) {
  if (r == 0) {
    store.forEach(x -> System.out.print(x + " "));
    System.out.println();
  } else if (r <= list.size() - i) {  // 개선
      store.add(list.get(i));
      getCombiImproved(list, store, d + 1, i + 1, r - 1); 
      store.remove(d);
      getCombiImproved(list, store, d, i + 1, r);
  }
}
```

위에서 언급한 '안 돌아도 되는 조건'을 구체화해보자. 매개변수 r에 현재 뽑아야 할 대상의 개수가 저장되어 있고, list.size()가 대상의 개수이다. 그리고 i에는 뽑을 대상의 위치가 저장되어 있으므로, r이 list.size()-i 보다 작거나 같으면 된다.


### 더 개선??

문제는, 이렇게 바꿔봐야 아주 조금 좋아질 뿐, 최고존엄 중첩 for loop에 비하면 호출 횟수가 매우 많다.<br/>
그래서 decision tree를 직접 그려봤다. 이유는 최종 decision, 즉 r값이 원하는 값에 도달할 때 까지 함수를 호출해야 하므로 여기서 오버헤드가 생기는 것 같다. 더 좋은 해결책은 모르겠다. 더 공부해보고 추후에 추가해야겠다.


틀린 부분은 댓글 부탁드립니다.