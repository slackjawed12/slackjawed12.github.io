---
layout: single

title: "[LeetCode][Java] 234. Palindrome Linked List"
categories: codingtest
tag: [Java, Stack, Queue]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

## 1. 문제 개요

[문제 링크](https://leetcode.com/problems/palindrome-linked-list/) <br/>

&nbsp; &nbsp; 단방향 연결리스트가 팰린드롬인지 판별하는 함수를 작성하는 문제이다. 문제의 제약조건은 $O(1)$의 추가 메모리만 허용하고, $O(N)$의 시간복잡도로 풀어야한다는 것이다.

## 2. 풀이

### 단순한 풀이법
&nbsp; &nbsp; 단순한 풀이법은 정수형 리스트를 하나 더 선언한 뒤, 순회하면서 데이터를 담는 것이다. 이후 선언한 리스트에 대해 팰린드롬인지 확인하면 되는데, 문제는 이 풀이방법은 추가 메모리가 $O(n)$ 필요하므로 Memory Exceed가 발생한다.  

### 풀이의 접근 방식
&nbsp; &nbsp; 즉, $O(1)$의 메모리 공간으로만 풀려면 파라미터로 주어진 연결 리스트만으로 팰린드롬 여부를 확인해야한다는 것이다. 결과적으로 head와 tail 변수를 두고 head는 순방향, tail은 역방향으로 진행하면서 팰린드롬인지 확인해야한다. 문제는 단방향 연결리스트이므로 따로 처리를 하지 않으면 tail이 역방향으로 진행할 수 없다. '따로 처리'라고 함은 결국 tail이 거꾸로 진행하도록 만들어야 한다는 것이다.  

### Floyd의 토끼와 거북이 알고리즘
&nbsp; &nbsp; 여기서 리스트의 일부를 역방향으로 만들기 위해 Floyd의 Cycle Detection 알고리즘이 등장한다. 토끼와 거북이 알고리즘이라고도 하는데, slow, fast 두개의 포인터로 리스트를 순회한다. slow는 한칸씩 이동하고, fast는 null이 아닐 때 2칸씩 이동한다. loop가 끝나면 fast는 null이 될 것이고, slow는 중간 노드가 된다(홀수일 경우. 짝수이면 중간의 오른쪽으로 설정).  
&nbsp; &nbsp; 이제 중간노드부터 마지막까지는 역방향으로 만들어줘야 한다. slow를 tail이라고 지정하고, 이전값을 담을 prev 포인터를 선언한다. 추가로, 중간노드의 경우 next값이 없어야 하므로 null로 지정해줘야 한다. 이렇게 설정하고 나면 tail은 역방향, head는 순방향으로 진행하게 되므로 팰린드롬을 확인해볼 수 있다.

```java
public boolean isPalindrome(ListNode head) {
    ListNode slow = head;
    ListNode fast = head;
    // Floyd 토끼 거북이
    while(fast != null){
        fast = fast.next;
        if(fast != null) {
            fast = fast.next;
            slow = slow.next;
        }
    }
    // 중간노드 이후부터 역방향 만들어 주기
    ListNode tail = slow.next;
    ListNode prev = slow;
    // 중간 노드는 다음에 연결되는 노드가 없으므로 null
    prev.next = null;
    while(tail != null){
        ListNode temp = tail;
        tail = tail.next;
        temp.next = prev;
        prev = temp;
    }
    
    // head, tail 비교하며 팰린드롬 확인
    tail = prev;
    while(tail != null){
        if(head.val != tail.val){
            return false;
        }    
        head=head.next;
        tail=tail.next;
    }    
    return true;
}
```

## 3. 배운 점

&nbsp; &nbsp; 연결리스트 문제에서 floyd의 알고리즘은 잊을만하면 나온다. 두 개의 포인터를 다른 방식으로 지정한다는 개념이 특정 문제상황을 해결할 때 중요한 것 같다.
