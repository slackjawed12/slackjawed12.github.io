---
layout: single

title: "[LeetCode][JavaScript] 605. Can Place Flowers"
categories: [[algorithm, greedy], javascript]
tag: [JavaScript, greedy]
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

## 1. 문제
&nbsp; &nbsp; 그리디하게 배열을 탐색해서 주어진 n만큼 1차원 배열에 1이 연속되지 않게 배치하는 문제이다. n개의 1을 배치할 수 있으면 true, 배치할 수 없으면 false이다. 예를 들어, [1,0,0,0,1] 배열에 n=1이면 index 2에 1을 배치하면 되므로 true이다. 반면 [1,0,0,0,1]에 n=2이면 1 두개를 연속하지 않게 배치할 수 없으므로 false이다. [문제 링크](https://leetcode.com/problems/can-place-flowers/) <br/>

## 2. 코드

&nbsp; &nbsp; 처음 시도해봤던 풀이는 다음과 같다. 연속된 0의 개수가 1,2일때는 n에서 0을 빼고, 3,4일 때는 1을 뺀다. 이런 규칙으로 배열의 끝까지 읽어서 n=0이면 true, 아니면 false로 하려고했다. 문제는 배열의 가장 앞, 뒷부분에서 0이 연속될 때 조건처리를 따로 해주어야한다는 점이 까다로웠다. 이 때는 2,3에서 1을, 4,5일 때 2를 빼야하기 때문이다.  
&nbsp; &nbsp; 그래서 애초에 0을 만날때마다 1을 배치할 수 있는 위치인지 확인하고, 1을 배치할 수 있으면 배치하는 방식으로 그리디하게 접근하였다. 인덱스 0과 마지막 인덱스, 즉 바운더리를 제외하면 조건은 쉽다. 인접한 인덱스에 1이 있는지만 보면 되기 때문이다. 문제는 바운더리를 처리하는 것이었다.
&nbsp; &nbsp; 자바스크립트에서는 이런 바운더리 처리에 대한 조건식을 단락평가 등을 이용해서 간단하게 할 수 있다.

```javascript
var canPlaceFlowers = function(flowerbed, n) {
  let count = 0;
  let arr = flowerbed;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0 && (i === 0 || arr[i - 1] === 0) && 
    (i === arr.length - 1 || arr[i + 1] === 0)) {
        arr[i] = 1;
        count++;
    }
  }
  return count >= n;
};
```

&nbsp; &nbsp; 세 가지의 표현식이 and로 연결되어 있다. 먼저 현재 위치의 값이 0인지 확인한다. 그리고 i가 0이거나 이전위치의 값이 0인지를 판단한다. 여기서 i가 0이면 바로 true이므로 arr[i-1]를 판단하지 않는다. 따라서 out of bound 문제에서 자유롭다. i가 0이 아니면 arr[i-1] === 0의 값을 갖는다. 마지막 and도 동일한 논리이다. 마지막 인덱스이면 true이므로 arr[i+1]을 판단하지 않아도 되므로 out of bound 문제가 생기지 않는다. 마지막 인덱스가 아니면 arr[i+1]===0을 값으로 갖는다.

## 3. 배운 것
배열의 바운더리 등 조건식이 까다로워지는 부분은 단락평가로 처리할 수 있다. 그런데 가독성이 좋은지는 모르겠다.