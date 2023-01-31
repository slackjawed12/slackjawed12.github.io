---
layout: single

title: "백준 1271 - 엄청난 부자2 (Java)"
categories: PS
tag: [Java, stream, BigInteger, collect]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: false # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---
## 1. 문제 설명
 $10^{1000}$ 범위를 갖는 두 자연수를 나누는 문제다. 다루는 수가 매우 크기 때문에, primitve type은 쓸 수가 없다. 이 문제가 브론즈5인 이유는 Java의 경우 API에 BigInteger 클래스가 있어서, 아무리 큰 수여도 메소드로 알아서 풀리기 때문이다. C나 C++로 풀려면 골치아프다. 문자열로 두 수를 받고 나눗셈을 직접 구현해야 할 것이다. 직접 해보진 않았다..
 
## 2. 풀이
 
 ``` java
 import java.io.*;
 import java.math.BigInteger;
 import java.util.Arrays;
 import java.util.List;
 import java.util.stream.Collectors;
 public class Main {
    public static void main(String[] args)throws Exception{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        List<BigInteger> arr=Arrays.stream(br.readLine().split(" "))
                .map(BigInteger::new)
                .collect(Collectors.toList());

        BigInteger ans1 = arr.get(0).divide(arr.get(1));
        BigInteger ans2 = arr.get(0).remainder(arr.get(1));

        System.out.println(ans1);
        System.out.println(ans2);
    }
 }
 ```
 1. 입력<br/>
 이번엔 BigInteger의 List 컬렉션으로 입력을 받아보았다. new 연산자도 ::로 축약 가능하다. IntelliJ께서 친절히 알려주셨다.
 ``` java
 List<BigInteger> arr=Arrays.stream(br.readLine().split(" "))
                .map(BigInteger::new)
                .collect(Collectors.toList());
 ```
 2. 풀이<br/>
 BigIneger의 경우 사칙연산을 하려면 내장된 메소드를 활용해야 한다. 나눗셈은 divde, 나머지 연산은 remainder이다.
    
 ``` java
 BigInteger ans1 = arr.get(0).divide(arr.get(1));
 BigInteger ans2 = arr.get(0).remainder(arr.get(1));
 ```
    
 3. 더 공부할 것<br/>
 BigInteger의 활용 - 내부에서 구체적으로 어떻게 돌아가는지는 알아야겠다.<br/>
 collect.(Collectors.toList()); - 이것들도 앞으로 자주 써먹게 될 것 같다.
