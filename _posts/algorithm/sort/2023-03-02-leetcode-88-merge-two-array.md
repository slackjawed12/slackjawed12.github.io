---
layout: single

title: "[LeetCode][Java] 88. Merge Sorted Array"
categories: [algorithm, divideconquer, sort]
tag: [Java, sort]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

## 1. 문제 개요

[문제 링크](https://leetcode.com/problems/merge-sorted-array/) <br/>

병합정렬에서 정렬된 두 배열을 합치는 부분(merge)을 구현하는 문제다.
이후 분할정복 과정에서 재귀호출을 통해 최종적으로 특정한 배열을 정렬할 수 있다.

## 2. 풀이 코드

길이가 각각 $M$, $N$이고 정렬되어 있는 두 배열을 합쳐야하는데, $ O(M+N)$ 시간으로 풀어야한다는 조건도 붙는다.<br/> 
$ O(M+N)$ 으로 병합을 해야 병합정렬이 $ O(N{\log}N)$ 으로 수행된다.
```java
public void merge(int[] nums1, int m, int[] nums2, int n) {
    // 문제 환경 상 nums1에 최종 정렬된 답이 들어가서, temp에 nums1 원본 할당
    int[] temp = Arrays.copyOfRange(nums1, 0, m+1);
    int i = 0, j = 0, pos = 0;   // i는 temp, j는 nums2, pos는 nums1 index
    while(i < m && j < n) {
        if(temp[i] <= nums2[j]) nums1[pos] = temp[i++];
        else nums1[pos] = nums2[j++];
        pos++;
    }   // 특정 배열 index에 도달할 때까지 loop
        
    if(i == m) {    // temp가 끝남 -> 남은 nums2 배열요소 대입
        while(j != n) {
            nums1[pos] = nums2[j++];
            pos++;
        }
    } else {
        while(i != m){
            nums1[pos] = temp[i++];
            pos++;
        }
    }
}
```
