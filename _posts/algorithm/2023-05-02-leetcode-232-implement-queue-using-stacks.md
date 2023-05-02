---
layout: single

title: "[LeetCode][Java] 232. Implement Queue using Stacks"
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

[문제 링크](https://leetcode.com/problems/implement-queue-using-stacks/) <br/>

&nbsp; &nbsp; 2개의 스택으로 큐를 구현하는 문제이다. 스택의 정리 방법을 잘 생각하면 전체 연산에 대한 amortized time complexity를 $O(1)$로 만들 수 있다.


## 2. 풀이 1

&nbsp; &nbsp; push 연산이 일어날 때, stack에 저장된 것을 bucket으로 옮긴다. 삽입할 요소를 stack에 넣고, bucket에 저장한 것들을 차례로 다시 stack에 다시 push하면 된다. 

```java
class MyQueue {
    Stack<Integer> bucket;
    Stack<Integer> st;
    
    public MyQueue() {
        bucket=new Stack<>();
        st=new Stack<>();
    }
    
    public void push(int x) {
        while(!st.empty()){
            bucket.push(st.pop());
        }
        st.push(x);
        while(!bucket.empty()){
            st.push(bucket.pop());
        }
    }
    
    public int pop() {
        return st.pop();
    }
    
    public int peek() {
        return st.peek();
    }
    
    public boolean empty() {
        return st.size()==0;
    }
}
```

### 문제점

&nbsp; &nbsp; $N$개의 push operation이 있다고 하면 $N$번의 push 연산의 총 시간복잡도는 $O(N^2)$이 된다. 한번의 push 연산이 $2*k$ 수행시간을 갖기 때문이다. 즉, 최악의 경우 연산 당 시간복잡도는 $O(N^2/N)=O(N)$이 된다.

## 3. 풀이 2

&nbsp; &nbsp; 두 개의 스택을 사용하는 점은 똑같다. 위와 차이점은 push할 때는 bucket에 넣어두고, 찾는 연산인 pop, peek이 호출될 때만 bucket에서 stack으로 옮긴다.

```java
class MyQueue {
    Stack<Integer> bucket;
    Stack<Integer> st;

    public MyQueue() {
        bucket = new Stack<>();
        st = new Stack<>();
    }

    public void push(int x) {
        bucket.push(x);
    }

    public int pop() {
        peek();
        return st.pop();
    }

    public int peek() {
        if (st.isEmpty()) {
            while (!bucket.isEmpty()) {
                st.push(bucket.pop());
            }
        }
        return st.peek();
    }

    public boolean empty() {
        return bucket.isEmpty() && st.isEmpty();
    }
}
```

&nbsp; &nbsp; 이제 시간복잡도를 대략적으로 계산해보면 다음과 같다. 편의상 $N$번의 push 연산과 $N$번의 pop 연산을 수행한다고 가정하자. 이는 연산의 순서와 관계없이 시간복잡도에 대한 결론은 같기 때문이다.

|연산|수행시간|
|:---|:---|
|push|$N*1$|
|첫 번째 pop|$1*2N$|
|이후 pop|$(N-1)*1$|

&nbsp; &nbsp; 총 연산 횟수가 $2N$이므로 평균 시간복잡도가 $O(4N/2N)=O(1)$이다. 1번 풀이와의 차이는 스택을 정리하는 작업을 언제 하는가의 차이이다. 이처럼 성능은 단순히 메서드 하나가 아닌 호출되는 맥락까지 고려한 전체적인 관점에서 분석하는 것이 중요한 것 같다.