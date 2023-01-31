---
layout: single

title: "백준 2480 - 주사위 세개"
categories: PS
tag: [Java, stream, sorted]
[//]: # ( 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성)
toc : true # table of contents 추가
use_math: false # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
nav : "docs"

[//]: # (# search : false # 검색 시 결과에 나타날지 여부 결정)
---
## 1. 문제 설명
 주사위 눈 3개의 값을 입력으로 받아 다음 조건에 해당하는 상금을 출력하는 문제다.
 1. 같은 눈이 3개가 나오면 10,000원+(같은 눈)×1,000원의 상금을 받게 된다.
 2. 같은 눈이 2개만 나오는 경우에는 1,000원+(같은 눈)×100원의 상금을 받게 된다.
 3. 모두 다른 눈이 나오는 경우에는 (그 중 가장 큰 눈)×100원의 상금을 받게 된다.

## 2. 풀이
 
 ``` java
 import java.io.BufferedReader;
 import java.io.BufferedWriter;
 import java.io.InputStreamReader;
 import java.io.OutputStreamWriter;
 import java.util.Arrays;
 public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int[] arr = Arrays.stream(br.readLine().split(" "))
                .mapToInt(Integer::parseInt)
                .sorted().toArray();

        int ans = 0;
        if(arr[0]==arr[1] && arr[1]==arr[2]) {
            ans=10000+arr[0]*1000;
        } else if(arr[0]==arr[1] || arr[1]==arr[2]) {
            ans=1000+arr[1]*100;
        } else {
            ans=arr[2]*100;
        }

        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        bw.write(String.valueOf(ans));
        bw.flush();
        bw.close();
    }
 }
 ```
 1. 입력, 출력<br/>
 입력 그대로 배열에 저장하면 조건문이 생각보다 지저분해졌다. 그래서 아래와 같이 입력을 받고 IntStream의 sorted 메소드로 배열을 정렬했다.
 ``` java
 int[] arr = Arrays.stream(br.readLine().split(" "))
                .mapToInt(Integer::parseInt)
                .sorted().toArray();
 ```
 
 2. 조건문<br/>
 배열이 오름차순으로 정렬된 상태이므로 아래와 같이 조건문을 작성할 수 있었다. 같은 것이 2개일 때는 arr[1]이 항상 같은 수가 되므로 따로 변수를 둬서 저장할 필요가 없다.
 ``` java
 int ans = 0;
        if(arr[0]==arr[1] && arr[1]==arr[2]) {
            ans=10000+arr[0]*1000;
        } else if(arr[0]==arr[1] || arr[1]==arr[2]) {
            ans=1000+arr[1]*100;
        } else {
            ans=arr[2]*100;
        }
 ```

 3. 배운 것<br/>
 stream의 sorted를 처음 적용해본 문제. 함수형 프로그래밍으로만 최대한 문제를 풀어보려 했는데 결국 조건문으로 돌아올 수 밖에 없었다. HashMap을 적용해볼까 했는데 지저분하긴 마찬가지.. 더 공부해야겠다.
