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

  $$ E_k = \frac{1}{2} m v^2 $$

## 1-1) 에라토스테네스의 체

## 1-2) C++ 코드

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
위 코드에는 약간 최적화한 부분이 있습니다.

# 2. 시간복잡도가 $O(n \mathrm {loglog} \mathit n)$ 임을 증명

  $$ 
  \frac{1}{2} O(nloglogn) 
  $$

## 2-1) 
## 2-2)
# 3. 


