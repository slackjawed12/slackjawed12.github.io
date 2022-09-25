---

layout: single

title: "에라토스테네스 체 시간복잡도 분석"
categories: Algorithm
tag: [c++, algorithm, 소수]
# 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: false # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
  nav : "docs"
# search : false # 검색 시 결과에 나타날지 여부 결정
---

에라토스테네스의 체는 1부터 N까지 소수를 구하는 방법입니다.
지금부터 에라토스테네스의 체 솔루션의 시간복잡도가 $ O(n \mathrm {loglog} \mathit n)$ 임을 알아보겠습니다.

# 1. 1부터 N까지 소수 구하기

## 1-1) 에라토스테네스의 체

## 1-2) C++ 코드

 에라토스테네스의 체를 C++로 구현한 코드입니다.

```cpp
vector<int> Eratosthenes(int n) {
    vector<int> answer;
    bool arr[1000001]={false};
    for(int i=2; i*i<=n; i++)
    {
        if(!arr[i]) 
        {
            for(int j=i*i; j<=n; j+=i)
            {
                arr[j]=true;
            }
        }
    }
    
    for(int i=2; i<=n; i++)
    {
        if(!arr[i]) answer.push_back(i);
    }
    return answer;
}
```
 위 코드에는 약간 최적화한 부분이 있습니다만, 연산 횟수에 있어서 크게 달라지진 않습니다.

## 1-3) 연산 횟수

 $N$에 대해 대략적인 연산 횟수를 계산해보면, 다음과 같습니다. 
 연산횟수 = $N/2+N/3+N/5+... = N TIMES 

# 2. 시간복잡도가 $O(n \mathrm {loglog} \mathit n)$ 임을 증명
  
  증명 과정의 핵심은 n보다 작은 소수의 역수 합이 O(loglogn) 임을 밝히는 것입니다. 
  아래 링크의 질문에 대한 답변에서 간단히 설명되어 있는데, 이를 단계적으로 풀어서 이해해보겠습니다.
  
  https://math.stackexchange.com/questions/4362120/sum-of-reciprocals-of-primes-easy-proof-that-sum-p-leq-x-frac1p-c-lo
  
## 2-1) 
## 2-2)

# 3. 


