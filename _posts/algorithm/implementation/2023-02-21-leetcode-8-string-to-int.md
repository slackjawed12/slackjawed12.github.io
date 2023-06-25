---
layout: single

title: "[LeetCode][Java] 8. String to Integer (atoi), 그리고 Leetcode"
categories: [algorithm, implementation] 
tag: [Java, 구현]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

## 1. 문제 개요

[문제 링크](https://leetcode.com/problems/string-to-integer-atoi/) <br/>

오늘 말로만 들었던 LeetCode를 처음 풀어봤다.<br/>
C, C++의 atoi 함수처럼 작동하는 myAtoi 함수를 아래 규칙에 따라 구현하는 문제다.<br/>

1. 앞의 공백(' ')은 무시한다.
2. 문자열의 끝이 아니라면, 다음 문자를 읽어 '+', '-' 확인
<br/> 부호 없이 바로 숫자로 시작하면 양수로 가정
3. 숫자가 아닌 문자나, 문자열의 끝에 도달할 때까지 문자열을     
   읽는다.<br/>
4. reading zero는 무시한다. ("0032" : 32)<br/> 
   숫자가 나오지 않으면 0을 리턴한다.
5. Integer의 MIN_VALUE, MAX_VALUE 범위를 벗어나면, MIN_VALUE, MAX_VALUE를 반환한다.
6. 변환 결과를 반환한다.


## 2. 풀이 코드

조건은 String의 trim()으로 해결했다.

### 오래 걸린 부분 - 2, 3번 조건의 해석

2, 3번 조건에 의해 '--34', 'abc 34', '++30' 등 '부호+숫자' 이전에 다른 문자가 등장하는 순간 0을 리턴해야된다. 이 부분은 테스트케이스를 작성하면서 파악했고, 코드를 잘못 짠 부분을 다시 구현하느라 오래 걸렸다.  
그래서 길이를 체크하면서 index 0 으로 부호를 받고, index 1부터 숫자를 카운트 해서 nonzero index를 구하면 됐을 것 같다. 너무 돌아갔다.<br/>
정규식을 쓴다면 "^[+-]?[0-9]+" 로 간단히 매칭할 수 있다.

```java
public boolean isCountable(String s){
        if(s.length() ==0 ) return false;   // 길이 0이면 끝
        else if(s.length() == 1) {  // 길이 1이면 숫자인지 확인
            return isNumber(s.charAt(0)); 
        } else {    // 길이 2 이상일때 부호+숫자 조합 확인
            if(!isNumber(s.charAt(0))) {
                return (s.charAt(0) == '+' || s.charAt(0) =='-') 
                        && isNumber(s.charAt(1));
            } else{
                return true;
            }
        }
    }

```

### 4, 5의 조합

가장 까다로운 부분이었다. 처음에 'int형으로만 풀어서 오버플로우를 체크해서 넘어갈 수 있지 않을까?'라는 생각에 아래의 이상한 시도를 했다.<br/>

- 더해질 값인 added 와 현재 값 answer의 합이 덧셈인데도 기존 값보다 작아진다면, added가 오버플로우가 일어나서 음수가 됐음을 의미하므로 MAX_VALUE를 반환한다.(뺄셈은 반대로) 

해당 방법은 자리수를 나타내는 digit이 10의 자리수로 곱해져서 예를 들어 100억이 되는 경우 added 값을 예측할 수 없게 된다. 즉, 오버플로우가 났는데도 돌고돌아 added가 양수가 될 수 있었고, 정상적인 덧셈이 될 수 있기 때문이다.

결국 int형만으로 체크하는 방법을 떠올리지 못해 long 타입을 도입하였다.<br/>
그런데 "10000000000000000005529"의 경우 digit은 심지어 long 타입의 MAX_VALUE까지도 넘어가는데 곱해지는 값이 0이다보니 반복문을 계속 돌고 있었다. loop 안에서 digit에 대한 조건까지 넣었더니 그제서야 ACC가 떴다..

``` java
long digit = 1;
for(int p = j-1; p >= i; p--){
    if(digit>Integer.MAX_VALUE) {
        return sign == -1 ? Integer.MIN_VALUE
            : Integer.MAX_VALUE;
    }
            
    long added = (s.charAt(p)-'0') * digit * sign;
            
    if(answer + added <Integer.MIN_VALUE){
        return Integer.MIN_VALUE;
    }
    if(answer + added>Integer.MAX_VALUE){
        return Integer.MAX_VALUE;
    }
    answer += added;

    digit *= 10;
}
```

## 3. LeetCode 특징

LeetCode는 Accept가 뜨면 전체 답안의 시간복잡도(Runtime), 공간복잡도(Memory)의 분포를 보여주는데, 그 분포에서 내 답안의 위치를 알 수 있게 된다. 즉, 얼마나 성능이 구린 코드인지 통계로 팬다.. 이것 때문에 easy 문제에서 통계가 거의 꼴찌로 나와 다시 푼 것도 있었다. 그랬더니 중간은 갔다.

이 분포를 보여주는 건 문제를 다시 복기하면서 효율적인 풀이 방법을 생각하게 하는 좋은 시스템인 것 같다.<br/> 
백준이나 프로그래머스 풀 때 말도안되는 stream 써서 한 줄로 풀기 같은 짓을 종종 해댔기 때문에..<br/>
물론 또 쉬운 길 내버려 두고 매번 어렵게 돌아갈 필요는 없다는 점에서, 둘 중 하나에 치우치지 않도록 항상 조심해야겠다는 생각이 들었다.