---
layout: single

title: "[LeetCode][Java] 100. Same Tree"
categories: codingtest
tag: [Java, tree, recursion]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

## 1. 문제 개요

[문제 링크](https://leetcode.com/problems/same-tree/) <br/>

두 트리가 같은지 다른지 확인하는 함수를 구현하는 문제이다. boolean을 반환해야 한다.


## 2. 풀이 코드

boolean을 재귀적으로 반환할 때 함수가 어떤 모습이어야 할 지 고민했는데, 아래와 같은 형태로 작성했다. 처음 해보는 방식이었다. 생각해보니 굳이 오버로딩 안 해도 됐다.

```java
// 재귀 helper 함수
public boolean isSameTree(TreeNode p, TreeNode q, boolean inter) {
    if(p == null && q == null) return inter;
    else if(p == null || q== null) return false;
    else if(p.val != q.val) return false;
    else {
        return isSameTree(p.left, q.left, true) && isSameTree(p.right, q.right, true);
    }
}
// solution 제출 함수
public boolean isSameTree(TreeNode p, TreeNode q) {
    return isSameTree(p, q, true);
}
```
