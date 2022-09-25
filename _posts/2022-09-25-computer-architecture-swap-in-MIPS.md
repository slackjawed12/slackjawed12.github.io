---

layout: single

title: "Swap 함수를 MIPS로 나타내기"
categories: Computer-Architecture
tag: [C, MIPS, 컴퓨터 구조]
# 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성
toc : true # table of contents 추가
use_math: false # 수식 쓸 경우 추가
author_profile: false # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
  nav : "docs"
# search : false # 검색 시 결과에 나타날지 여부 결정
---
 
 Computer Organization and Design 5ed를 개인적으로 공부하면서 정리한 내용입니다.  
 
 두 변수의 값을 맞바꾸는 Swap 함수를 MIPS 명령어 셋으로 나타내는 과정입니다.  
 
# 1. C로 작성한 Swap 함수 
 
 먼저 C 코드로 Swap 함수를 어떻게 작성하는지 보겠습니다.  
 (인자로 배열 v의 주소와 정수 k를 받는 경우)  

 ``` c
 void Swap(int v[], int k)
 {
    int temp;
    temp=v[k];
    v[k]=v[k+1];
    v[k+1]=temp;
 }
 ```  
   
# 2. MIPS의 명령어 셋으로 바꾼 Swap 함수
 $a0 : 배열 v의 시작 주소  
 $a1 : k의 값  
 $t0 : temp 값 = v[k]의 값이 됨  
 $t1 : v[k]의 주소(처음엔 k*4의 값으로 사용)  

 ```assembly
 SWAP:
        sll     $t1, $a1, 2     // $t1 = k * 4
        add     $t1, $a0, $t1   // $t1 = v[k]의 주소

        lw      $t0, 0($t1)      // $t0 = v[k] 
        lw      $t2, 4($t1)      // $t2 = v[k+1]

        sw      $t0, 4($t1)
        sw      $t2, 0($t1)
        jr      $ra
 ```


 