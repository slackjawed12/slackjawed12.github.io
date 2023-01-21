---
layout: single

title: "에라토스테네스 체 구현 및 시간복잡도 분석"
categories: PS
tag: [C++, algorithm, 소수]
# 태그 여러개 달고 싶으면 [태그1, 태그2, 태그3 ... ] 으로 작성
toc : true # table of contents 추가
use_math: true # 수식 쓸 경우 추가
author_profile: true # 포스트 화면에서 작성자 프로필이 나타날지 여부 결정

sidebar:
  nav : "docs"
# search : false # 검색 시 결과에 나타날지 여부 결정

# 로컬 개발환경 설정 : slackjawed12.github.io 디렉터리 이동 후 bundle exec jekyll serve 명령어 실행
# 명령어에 나온 포트가 4000이면 localhost:4000 접속
---

 에라토스테네스의 체는 1부터 N까지 소수를 구하는 방법입니다. 중학생 때 처음 1부터 100까지 해봤던 기억이 나네요. 연필로 써서 과정을 따라갈 때는 10개 단위로 끊어서 표를 작성하기도 합니다.  

# 1. 에라토스테네스의 체 알고리즘
 
 핵심 과정은 다음과 같습니다.   
  - 1은 지우고 시작합니다.
  - 2부터 시작해서 자기 자신을 제외한 배수를 N까지 지워나가면 됩니다. 
  - 그 다음 남은 숫자부터 시작해서 2일 때의 과정을 반복합니다.  

 이제부터 에라토스테네스의 체 알고리즘의 시간복잡도가 $ O(N \log\log N)$ 임을 알아보겠습니다.

## 1-1) C++ 코드

 에라토스테네스의 체를 C++로 구현한 코드입니다.

```cpp
vector<int> Eratosthenes(int n) {
    vector<int> answer;
    bool arr[1000001]={false};
    for(int i=2; i*i<=n; i++) {
        if(!arr[i]) {
            for(int j=i*i; j<=n; j+=i)
                arr[j]=true;
        }
    }
    
    for(int i=2; i<=n; i++) {
        if(!arr[i]) answer.push_back(i);
    }
    return answer;
}
```
 위 코드에는 약간 최적화한 부분이 있습니다만, 연산 횟수는 크게 다르지 않습니다.  
 (참고 - i*i가 int type의 최댓값보다 크면 overflow가 발생하므로 주의해야합니다. 이것 때문에 풀이하는데 약간 시간이 걸렸습니다.)

## 1-2) 연산 횟수

 위 코드에서 $N$에 대해 대략적인 연산 횟수는 다음과 같습니다.  
 
 $$ \frac{N}{2}+\frac{N}{3}+\frac{N}{5}+\cdots = N \times \sum_{p \leq n} {\frac{1}{p}} $$
 
 여기서 우변은 $N$보다 작은 소수의 역수들의 합입니다.

# 2. 시간복잡도 증명
  
   위키피디아를 찾아보면, $\Omega(\log\log N)$ 임은 쉽게 알 수 있습니다.  
  [위키피디아 증명](https://en.wikipedia.org/wiki/Divergence_of_the_sum_of_the_reciprocals_of_the_primes)  
  
  하지만 $\sum_{p \leq n} {\frac{1}{p}}$이 $ O(\log\log N)$ 이라는 것은 알 수가 없어서 찾아봤더니 아래 링크의 질문글에 답변이 있었습니다.  
  [Big-O 증명](https://math.stackexchange.com/questions/4362120/sum-of-reciprocals-of-primes-easy-proof-that-sum-p-leq-x-frac1p-c-lo)  
  
  근데 위 답변글은 제 머리로 따라가기에는 함축적으로 수식을 전개해서 이해하기가 힘들더라구요.. 이를 단계적으로 풀어서 제 나름대로 해석해보았습니다. 사실 형식적인 부분이고, 위키피디아에서 나온 증명과 Big-O notation의 정의를 숙지하고 있으면 되는 것 같습니다.   

## 2-1) 1단계 - 정수론의 기본 정리
  먼저 식을 간단히 하기 위해, 다음과 같이 정의합니다.

  $$ A=\sum_{p \leq n} {\frac{1}{p}} $$

  이 때, $p_{1},p_{2},\cdots,p_{k}\leq N$ 을 만족하는 자연수 $k$에 대해 다음과 같이 간단히 쓰겠습니다.

  $$ A^{k}=\sum_{p_{1},p_{2},\cdots,p_{k}\leq N}{\frac{1}{p_{1}p_{2}\cdots p_{k}}} $$
  
  여기서 $1 \leq p_{1}p_{2} \cdots p_{k}\leq N^{k}$ 이고, $ m = p_{1}p_{2} \cdots p_{k} $로 표현할 수 있는 자연수 $ m $은 $ p_{1},  p_{2}, \cdots, p_{k} $가 모두 다를 경우 $A^{k}$ 식에서 최대 $k!$번 나타나게 됩니다. 따라서, 다음이 성립합니다.  
  
  $$ A^{k}=\sum_{p_{1},p_{2},\cdots,p_{k}\leq N}{\frac{1}{p_{1}p_{2}\cdots p_{k}}} \le k! \sum _{i=1}^{n^{k}}{\frac{1}{i}}$$
  
## 2-2) 2단계 - 적분
  이 부분은 적분 관계식에 의해 쉽게 알 수 있습니다. 즉,

  $$\ln(n^{k}+1)=\int_{1}^{n^{k}}{\frac{dx}{x}}=\sum_{i=1}^{n^{k}}{\int_{i}^{i+1}{\frac{dx}{x}}}$$
  
  에서 다음이 성립합니다.
  
  $$ \frac{1}{2}\sum_{i=1}^{n^{k}}{\frac{1}{i}} \le \sum_{i=1}^{n^{k}}{\int_{i}^{i+1}{\frac{dx}{x}}} = \ln (n^{k}+1) $$

  식을 마무리하면, 다음과 같습니다.

  $$ A^{k}=\sum_{p_{1},p_{2},\cdots,p_{k}\leq N}{\frac{1}{p_{1}p_{2}\cdots p_{k}}} \le k! \sum _{i=1}^{n^{k}}{\frac{1}{i}} \le k! \times 2 \ln (n^{k}+1) $$

  이제 $k$ 제곱근을 취하면 다음 식이 나옵니다. ($(k!)^{1/k} \le (k^{k})^{1/k} \le k $과, $k^{1/k}=e^{(\ln k) / k} \le e$ 이용)

  $$ A \le (k!2k \ln n)^{1/k} \le 2ek(\ln n)^{1/k} $$ 
  

## 2-3) 3단계 - Big-O 증명
  이제 Big-O notation의 정의에 의해, 모든 $ n \ge n_{0} $ 에 대해 $ 0 \le f(n)=2ek(\log n)^{1/k} \le c\log\log n $인 양의 상수 $c, n_{0}$가 존재하는지만 판단하면 됩니다.

  자연수 $k=\lceil \ln \ln n+1\rceil$ 로 정의하면 $ 2ek(\ln n)^{1/k} \le 2e^{2}(\ln \ln n +1) $ 이므로, $n \ge 3$에 대해 $c=2e^{2}(\ln \ln3+1)/\ln\ln 3$ 으로 두면 $f(n)=O(\ln\ln n)$ 이 증명됩니다.
  


틀린 부분은 댓글 남겨주세요.