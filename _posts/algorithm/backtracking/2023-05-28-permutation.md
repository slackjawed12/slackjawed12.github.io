---
layout: single

title: "순열(Permutation) 재귀 구현"
categories: [algorithm, backtracking, recursion]
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

## 1. 순열의 재귀 구현 - DFS$$
&nbsp; &nbsp; 논의를 간단히 하기 위해서 1부터 N까지의 자연수 $n$개에서 $r$개를 뽑는 순열의 집합을 구하는 것으로 가정했다. 배열이나 컬렉션을 쓴다면 loop문만 바꾸면 된다.   
&nbsp; &nbsp; 재귀로 구현한 코드는 다음과 같다. 헬퍼함수는 오버로딩하여 작성했고, 반환타입이 List<List<Integer\>>인 재귀함수로 구현하여 API처럼 호출했을 때 순열 목록 리스트를 받을 수 있도록 했디.

```java
public List<List<Integer>> permutations(int n, int r) {
    List<List<Integer>> result = new ArrayList<>();
    permutations(nums, new ArrayList<>(), result);
    return result;
}

private void permutations(int n, int r, List<Integer> path, List<List<Integer>> result) {
    if (path.size() == r) {
        result.add(new ArrayList<>(path));
    }
        
    for (int i = 1; i <= n; i++) {
        if (!path.contains(i)) {
            path.add(i);
            permutations(n, r, path, result);
            path.remove(path.size() - 1);
        }
    }
}
```
&nbsp; &nbsp; 처음 작성한 버전은 헬퍼함수도 이중리스트를 반환하는 식으로 작성했는데, 이렇게 하면 중간정답인 result에 해당하는 객체가 파라미터와 반환값 두 군데에 있어야한다. 파라미터에 없으면 호출마다 result 객체를 생성해야한다. 두 방식 모두 성능 측면에서나 코드 가독성 측면에서나 좋지 않다. 결국 삭제해도 무방한 요소인 셈이므로 헬퍼메서드는 반환타입을 void로 결정했다.  
&nbsp; &nbsp; 또한 path.contains(i)로 i를 방문했는지 여부를 체크했다. 이는 메서드의 파라미터(visit 배열)를 줄이기 위해서이기도 하고, 순열 리스트 자체에는 요소의 수가 그다지 많지 않을 것이므로 성능 저하가 크지 않을 것으로 판단했기 때문이다. 어쨌든 리스트 컬렉션에서 contains를 호출하기 때문에 그다지 좋은 방식은 아닌데, contains를 안 쓰려면 방문정보를 담는 visit[] 배열을 사용하면 된다.

## 2. 호출횟수의 개선 - Swap 방식
&nbsp; &nbsp; 위에서 DFS로 구현한 함수는 호출횟수가 필요 이상으로 많다. 예를 들어, 4개 중에 4개를 뽑아 permutations을 만드는 경우의 수는 총 24가지인데, 실제 count를 출력해보면 호출횟수는 65가 나온다. 즉, 호출 횟수의 측면에서 보면 비효율적이라는 것이다. 이를 보완하기 위해 Swap 방식의 순열 구하기 알고리즘이 있다. 물론 단점도 있다. 순열의 대상 자체에 변경이 생긴다는 것이고, 순서가 바뀌기 때문에 DFS 방식처럼 일정한 규칙에 의한 순서로 출력되지 않는다는 것이다.