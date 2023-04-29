---
layout: single

title: "[LeetCode][Java] 226. Invert Binary Tree"
categories: codingtest
tag: [Java, Tree]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

## 1. 문제 개요

[문제 링크](https://leetcode.com/problems/invert-binary-tree/) <br/>

&nbsp; &nbsp; 이진 트리를 거꾸로 뒤집는 문제이다.


## 2. 풀이 코드

&nbsp; &nbsp; 재귀적으로 swap을 하면 된다.

```java
public TreeNode invertTree(TreeNode root) {
    if(root==null) {
        return null;
    }
        
    TreeNode temp = invertTree(root.left);
    root.left = invertTree(root.right);
    root.right = temp;
    return root;
}
```