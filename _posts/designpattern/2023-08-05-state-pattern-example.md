---
layout: single

title: "[Design Pattern] 상태 패턴(State Pattern) 기초 개념"
categories: [designpattern]
tag: [Design Pattern, State Pattern]
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

&nbsp; &nbsp; 상태 패턴은 보통 어떤 객체의 행위를 상태에 따라 다르게 하도록 구현해야 하는 경우 적용되는 디자인 패턴이다. 게임에서 AI를 간단히 구현할 때 종종 사용한다. 상태패턴을 적용한 간단한 예시로,
[백준 1913번](https://www.acmicpc.net/problem/1913) 문제를 풀어보자. 

## 1. 상태패턴 없이 구현
&nbsp; &nbsp; 홀수 N이 주어질 때, 가로 N, 세로 N 크기의 표를 달팽이 모양으로 $N \times N$부터 1까지 채우는 문제이다.
아래로 움직이는 중에 방향을 바꿔야 하는 조건에 해당하면 오른쪽으로 움직이게 바꾸고, 오른쪽으로 움직이던 중에 방향을 바꿔야 하면 위로 움직이도록 구현하면 된다.
이런 방향 변화를 간단히 나타내면, DOWN -> RIGHT -> UP -> LEFT -> DOWN 순서이다. 길이가 4인 배열에 modular 연산을 적용하면 쉽게 구현할 수 있다.

```javascript
// 0, 1, 2, 3 인덱스가 각각 DOWN, RIGHT, UP, LEFT에 해당
const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];
let i = 0;
let count = N * N;
while(count > 0){
  map[y][x]= count--;
  let ny = y + dy[i];
  let nx = x + dx[i];
  // setDirection : 다음 좌표와 현재좌표를 바탕으로 방향 배열의 인덱스를 반환한다.
  i = setDirection(x, y, nx, ny);
  x += dx[i];
  y += dy[i];
}
```
&nbsp; &nbsp; 의사코드로 생각해보면, setDirection 함수는 범위를 벗어났거나 다음 자리에 이미 값이 들어가있을 때 (i+1)%4를 반환하고,
그런 경우가 아니면 현재 인덱스를 반환하면 된다. 
구현 자체가 명확하고, 코드도 깔끔한 편이다. 다만 이 문제의 맥락이 비즈니스 로직의 일부를 작성하는 것이라면 확장에 유연해야 한다. 

## 2. 상태패턴을 적용한 풀이
움직이는 객체를 나타내는 클래스를 Agent라고 정의하자. 위치와 num, 그리고 움직이는 상태인 state를 갖고있다.
```javascript
class Agent {
  x: number;
  y: number;
  num: number;
  state: MoveState;
  constructor(x: number, y: number, num: number, state: MoveState) {
    this.x = x;
    this.y = y;
    this.num = num;
    this.state = state;
  }
  move(matrix: number[][]): [number, number] {
    this.state = this.state.handle(this, matrix);
    return [this.x, this.y];
  }
}
```
이제 State들을 정의해보자. MoveState는 handle 메서드가 있는 interface
로 정의하고, MoveState의 구현체들은 handle 메서드를 재정의한다. handle 메서드는 각 state에서의 동작과 다음 상태를 반환한다. 예를 들어, 왼쪽으로 움직이는 상태를 나타내는 LeftState 객체는 다음처럼 구현할 수 있다.

```javascript
interface MoveState {
  handle(agent:Agent, matrix: number[][]): MoveState;
}
class LeftState implements MoveState {
  handle(agent: Agent, matrix: number[][]): MoveState {
    const [x, y] = [agent.x, agent.y];
    matrix[y][x] = agent.num--;
    // 범위 밖으로 가거나, 다음 위치에 이미 숫자가 있는 경우
    if (x === 0 || matrix[y][x - 1] !== 0) {
      agent.y++;
      // 상태를 바꾼다.
      return new DownState();
    }
    agent.x--;
    // 상태를 바꾸지 않는다.
    return this;
  }
}
```
LeftState처럼 RightState, UpState, DownState를 구현하면 된다. 이제 Agent 객체를 초기화하고, 아래 루프에 따라 움직이게 하면 된다.
```javascript
const agent = new Agent(0, 0, N * N, new DownState());
while (agent.num > 0) {
  // 1913 문제에서 target이면 정답을 할당하는 부분이다.
  if (agent.num === target) {
    [ax, ay] = [agent.x + 1, agent.y + 1];
  }

  agent.move(matrix);
}
```

