---
layout: single

title: "Boyer-Moore 과반수 투표 알고리즘"
categories: [algorithm, streaming]
tag: [Java, Streaming Algorithm]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

&nbsp; &nbsp; Boyer-Moore 과반수 투표 알고리즘(Boyer-Moore Majority Vote Algorithm)은 1차원 배열에 과반수를 차지하는 배열요소가 있는지 찾는 알고리즘이다. 이 때 시간복잡도는 데이터의 수를 $n$이라 할 때 $O(n)$이고, 알고리즘 실행에 필요한 공간복잡도는 $O(1)$이다.   
&nbsp; &nbsp; 만약 공간복잡도에 제약이 없다면 Hash 자료구조를 통해 과반수 요소를 $O(n)$의 시간복잡도로 찾을 수 있을 것이다. 이 때 Worst Case라면 $O(n)$의 메모리가 더 필요하다. Boyer-Moore의 과반수 투표 알고리즘을 이용하면 $O(1)$ 메모리 공간으로 해결할 수 있다.  
&nbsp; &nbsp; 이렇게 추가적인 메모리 공간을 최소화하면서 $O(n)$으로 문제를 해결하는 종류의 알고리즘을 Streaming Algorithm이라고 한다. 일반적으로 상수인 $c$에 대해 $O({log}^c n)$의 메모리 공간을 제약으로 둔다.

## 1. 문제 개요

&nbsp; &nbsp; 대표적인 예시로 [LeetCode의 169번 문제](https://leetcode.com/problems/majority-element/)가 있다. 해당 문제에서는 과반수를 차지하는 배열요소가 반드시 1개 존재하는 1차원 배열이 주어진다. 

## 2. Boyer-Moore 과반수 투표 알고리즘

&nbsp; &nbsp; 비유를 통해 알고리즘을 이해해보자. $n$명의 친구가 여름에 휴가를 가려고 한다. 휴가지를 투표로 결정하려고 하는데, 과반수인 휴가지가 있을 때 그곳으로 휴가를 가기로 했다. 이 때, 1번부터 $n$번까지 친구들은 각자 원하는 휴가지를 딱 하나씩만 뽑아야 한다.  
&nbsp; &nbsp; 예를 들어, 21명의 친구들이 투표를 했을 때 부산 11표, 강릉 5표, 대전 2표, 대구 3표가 나왔다고 한다면, 총 투표 용지 수는 21이고 11표는 과반수이므로 부산이 투표지로 결정된다.  
&nbsp; &nbsp; 그럼 이제 투표가 끝나서 투표 결과를 기록해야한다. 중요한 것은 투표 결과의 기록 방식이다. 일반적인 반장선거처럼 투표 결과를 휴가지가 나올때마다 투표 수를 1개씩 늘려가며 기록하는 것이 아니다. 일단 처음 투표용지를 뽑았을 때 나온 휴가지를 과반수라고 가정해버리고, 이것을 major라고 하자. 투표 수도 1 늘린다. 이제, major와 같은 투표용지가 나오면 major의 투표 수를 1만큼 늘린다. **다른 용지가 나오면? major의 투표 수를 1만큼 줄인다!** 투표 수가 줄다가 언젠가 0이 될 수도 있다. 이 때는 투표 수를 음수로 만드는 것이 아니라, 새로 들어온 투표 용지가 major의 자리를 차지한다.  
&nbsp; &nbsp; 예를 들어, 방금 상황에서 부산 3표가 나온 상태인데 강릉 투표지가 나오면 부산 3표, 강릉 1표로 기록하는 것이 아니라, 부산 2표로 깎아버린다는 것이다! 즉, 과반수인 투표지는 쪽수로 밀어붙여 마지막까지 남게 된다.

## 3. 구현 코드

&nbsp; &nbsp; major와 count만 조건에 맞게 증감시켜주면 된다.
```java
public int majorityElement(int[] nums) {
    int major = nums[0];
    int count = 1;
    for(int i=1; i<nums.length; i++) {
        int cur = nums[i];
            
        if(major==cur) {
            count++;
        } else if(count==0) {
            major=cur;
            count++;
        } else {
            count--;
        }
    }
        
    return major;
}
```

## 3. 알고리즘의 한계

&nbsp; &nbsp; 과반수를 차지하는 배열요소가 없으면, '과반수'라는 로직과는 아무 상관이 없는 배열요소, 즉 마지막에 남은 배열요소가 나오게 된다.
