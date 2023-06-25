---
layout: single

title: "[백준][Java] 2480 - 주사위 세개"
categories: [algorithm, implementation]
tag: [Java, stream, sorted]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: false # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
 nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---

## 1. 문제 개요
[문제 링크](https://www.acmicpc.net/problem/2480)
### 문제
1에서부터 6까지의 눈을 가진 3개의 주사위를 던져서 다음과 같은 규칙에 따라 상금을 받는 게임이 있다. 

1. 같은 눈이 3개가 나오면 10,000원+(같은 눈)×1,000원의 상금을 받게 된다. 
2. 같은 눈이 2개만 나오는 경우에는 1,000원+(같은 눈)×100원의 상금을 받게 된다. 
3. 모두 다른 눈이 나오는 경우에는 (그 중 가장 큰 눈)×100원의 상금을 받게 된다.  

예를 들어, 3개의 눈 3, 3, 6이 주어지면 상금은 1,000+3×100으로 계산되어 1,300원을 받게 된다.<br/> 
또 3개의 눈이 2, 2, 2로 주어지면 10,000+2×1,000 으로 계산되어 12,000원을 받게 된다.<br/>
3개의 눈이 6, 2, 5로 주어지면 그중 가장 큰 값이 6이므로 6×100으로 계산되어 600원을 상금으로 받게 된다.<br/>

3개 주사위의 나온 눈이 주어질 때, 상금을 계산하는 프로그램을 작성 하시오.

### 입력
첫째 줄에 3개의 눈이 빈칸을 사이에 두고 각각 주어진다. 

### 출력
첫째 줄에 게임의 상금을 출력 한다.


## 2. 풀이 코드 및 설명
 
 ``` java
 import java.io.*;
 import java.util.Arrays;
 public class Main {
    public static void main (String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int[] arr = Arrays.stream(br.readLine().split(" "))
                          .mapToInt(Integer::parseInt)
                          .sorted().toArray();

        int ans = 0;
        if (arr[0] == arr[1] && arr[1] == arr[2]) {
           ans = 10000 + arr[0] * 1000;
        } else if (arr[0] == arr[1] || arr[1] == arr[2]) {
            ans = 1000 + arr[1] * 100;
        } else {
            ans = arr[2] * 100;
        }

        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        bw.write(String.valueOf(ans));
        bw.flush();
        bw.close();
    }
 }
 ```

### 1) 입력, 출력
 입력 그대로 배열에 저장하면 조건문이 생각보다 지저분해졌다. 그래서 아래와 같이 입력을 받고 IntStream의 sorted 메소드로 배열을 정렬했다.
 ``` java
 int[] arr = Arrays.stream(br.readLine().split(" "))
                   .mapToInt(Integer::parseInt)
                   .sorted().toArray();
 ```
 
### 2) 조건문
 배열이 오름차순으로 정렬된 상태이므로 아래와 같이 조건문을 작성할 수 있었다. 같은 것이 2개일 때는 arr[1]이 항상 같은 수가 되므로 따로 변수를 둬서 저장할 필요가 없다.
 ``` java
 int ans = 0;
 if(arr[0] == arr[1] && arr[1] == arr[2]) {
     ans = 10000 + arr[0] * 1000;
 } else if (arr[0] == arr[1] || arr[1] == arr[2]) {
     ans = 1000 + arr[1] * 100;
 } else {
     ans = arr[2] * 100;
 }
 ```


### 3. 배운 것
 stream의 sorted를 처음 적용해본 문제. 함수형 프로그래밍으로만 최대한 문제를 풀어보려 했는데 결국 조건문으로 돌아올 수 밖에 없었다. HashMap을 적용해볼까 했는데 지저분하긴 마찬가지.. 더 공부해야겠다.
