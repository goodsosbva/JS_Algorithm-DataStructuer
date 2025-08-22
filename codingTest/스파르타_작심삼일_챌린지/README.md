# 작심삼일 챌린지

#### !! 리드미 올리는 코드는 시니어 정답 코드
#### !! 파일로 올리는건 내가 낸 정답 코드

### 1. 소수 구하기 https://www.acmicpc.net/problem/1929
### 2. 안전 영역 https://www.acmicpc.net/problem/2468
- 스파르타 시니어 코드 <br />
```python
import sys
sys.setrecursionlimit(100000)
input = sys.stdin.readline

dx = [-1, 1, 0, 0]
dy = [0, 0, -1, 1]

def dfs(x, y, h):
    visited[x][y] = True
    for d in range(4):
        nx = x + dx[d]
        ny = y + dy[d]
        if 0 <= nx < n and 0 <= ny < n:
            if not visited[nx][ny] and graph[nx][ny] > h:
                dfs(nx, ny, h)

n = int(input())
graph = [list(map(int, input().split())) for _ in range(n)]

max_height = max(map(max, graph))

max_safe_zone = 0
for h in range(0, max_height + 1):
    visited = [[False] * n for _ in range(n)]
    safe_zone_count = 0

    for i in range(n):
        for j in range(n):
            if not visited[i][j] and graph[i][j] > h:
                dfs(i, j, h)
                safe_zone_count += 1

    max_safe_zone = max(max_safe_zone, safe_zone_count)

print(max_safe_zone)
```
### 3. 저울 https://www.acmicpc.net/problem/2437
🔍 접근 방법 (시니어 설명) <br />
이 문제는 그리디 알고리즘을 기반으로 한 대표적인 아이디어 문제야.

문제를 보면, 여러 개의 추가 주어지고 이걸로 측정할 수 없는 가장 작은 무게를 찾으라고 하지?

이때 중요한건 모든 조합을 구해서 가능한 무게를 다 만들어보는 게 아니라, 가장 작은 수부터 하나씩 쌓아가면서 만들 수 있는 범위를 확장해 가는 방식이 훨씬 효율적이라는걸 생각해야 한다는 것이야.

핵심 포인트:

- 입력된 추들을 오름차순으로 정렬
- 현재까지 만들 수 있는 모든 무게의 최대값을 target이라고 가정
- 다음 추가 target보다 작거나 같으면 → 기존 범위에 이어서 측정 가능
- 추가 target보다 크면 → 그 순간의 target이 만들 수 없는 최소 무게가 된다!

접근 방법:

1. 입력된 무게 리스트를 오름차순으로 정렬해

2. target = 1부터 시작해, 현재까지 만들 수 있는 모든 무게 범위 [1, target)보다 큰 추가 나오면 break

3. 순회하면서 현재 추가 target보다 작거나 같으면, 해당 추를 더해서 target 범위를 키워줘

4. 만약 target보다 큰 추가 나온다면 거기서 break해주면돼. 그 순간이 우리가 찾는 답이 될거야!

주의사항:

- 정렬을 안 하면 답이 절대 안 나와! 항상 작은 값부터 순차적으로 처리해야 해
- target < 추의 무게 이 조건이 딱 걸리는 시점이 핵심 분기점이야 <br />
💻 풀이 코드 1 <br />
```python
n = int(input())
data = list(map(int, input().split()))
data.sort()

target = 1
for x in data:
    if target < x:
        break
    target += x

print(target)
```
📝 코드 설명 <br />
이 코드는 정렬 + 누적합 + 조건문만으로 문제를 해결할 수 있어.

처음에 target = 1로 시작하는 이유는, 기본적으로 1원을 만들 수 있는지 없는지부터 따져보기 위해서야.

이후 반복문을 돌면서, 현재 추(x)가 지금까지 만들 수 있는 범위보다 작거나 같으면 그걸 추가해서 target을 확장해줘.

예를들어서, target이 4인데 다음 추가 3이면 → 1~6까지 만들 수 있게 되는 거지!

반대로, 다음 추가 target보다 크면 → 그 추로는 target을 만들 수 없기 때문에, 거기서 바로 종료하면돼

결과적으로 반복이 끝났을 때의 target이 우리가 만들 수 없는 최소 무게가 되는 거야.
📊 복잡도 분석 <br />
시간 복잡도: O(n log n)
공간 복잡도: O(n)
⚡ 최적화 팁 <br />
1. 정렬우선: 가추를 작은 값부터 사용해야 그리디 전략이 제대로 작동할 수 있어
2. target 누적만으로 해결: 별도의 배열이나 조합 계산 없이, 누적합만으로 측정 가능한 범위를 관리할 수 있어
3. 빠른 종료 전략: target보다 큰 수가 나오면 바로 종료하면 되니까, 불필요한 반복 없이 성능도 좋아
🎯 학습 포인트 <br />
- 그리디 알고리즘의 정렬 기반 접근은 필수로 알아둬야해
- 누적합과 비교를 활용한 범위 확장! 조합 계산 없이 문제를 해결할 수 있어!
- 조건문 하나로 절묘하게 분기되는 로직을 파악하는 감각 키우기
🔗 관련 문제
- 이런 유형은 “추”, “동전”, “무게” 같은 키워드가 나오면 정렬 + 누적합 + 그리디 조합을 떠올려야 해
- 가장 작은 경우부터 고려하며 조건을 점검하는 방식은 좋은 전략이야
- 문제 조건이 간단해 보이지만, 조합을 쓰면 시간 초과 나고 그리디로 풀면 한 줄 조건문으로 깔끔하게 풀리는 문제라는 걸 익혀두면 실전에서 시간 아낄 수 있어


### 6. JadenCase 문자열 만들기 https://school.programmers.co.kr/learn/courses/30/lessons/12951?language=python3
#### 시니어 코드
💻 풀이 코드 1 <br />
```python
def solution(s):
    slist = s.split(' ')  # 공백을 기준으로 문자열을 단어로 나눕니다.
    for i in range(len(slist)):
        slist[i] = slist[i].capitalize()  # 각 단어의 첫 글자를 대문자로 바꿉니다.
    result = ' '.join(slist)  # 다시 공백을 기준으로 단어들을 합칩니다.
    return result
```
📝 코드 설명
먼저 문자열을 ' ' 기준으로 split해서 단어 리스트를 만들어줘

이때 공백이 여러 개일 경우 빈 문자열('')도 리스트에 포함돼

각 단어에 대해 capitalize()를 적용하면, 첫 글자는 대문자, 나머지는 자동으로 소문자로 전환돼

단어가 빈 문자열이면 capitalize()는 그냥 빈 문자열을 그대로 반환하므로 안전하다!

모든 단어를 변환한 뒤에는 ' '.join()을 통해 다시 하나의 문자열로 붙여줘

이 과정을 통해 공백 위치까지 원래대로 유지되며, 원하는 결과가 나오면 끝!
📊 복잡도 분석 <br />
시간 복잡도: O(N)
공간 복잡도: O(N)
⚡ 최적화 팁
1. [공백 유지]: ' '.join()을 사용하면 split할 때 생긴 공백 구조를 자연스럽게 되살릴 수 있어
2. [빈 문자열 처리]: 빈 문자열에 capitalize()를 적용해도 에러가 나지 않으므로 따로 조건 분기 필요가 없다~
3. [메서드 활용]: 직접 구현하지 말고 capitalize()를 적극 활용하면 훨씬 깔끔하다
🎯 학습 포인트 <br />
- 문자열에서 단어별로 특정 포맷을 적용하는 방법은 여러가지이니까 도전해봐
- split-join 패턴의 유용성을 익혀봐
- 문자열 메서드 capitalize()는 기본이니 꼭 알아두자
🔗 관련 문제
- 문자열 조작 문제에서는 split과 join으로 공백 문제를 깔끔히 다룰 수 있다
- 연속된 공백이나 앞뒤 공백을 보존해야 할 때는 반드시 split(’ ’)처럼 명시적 구분자를 써야 함을 잊지말자
- 문자열 포맷팅은 직접 구현보다 내장 메서드를 활용하는 게 훨씬 안정적이고 빠르다!

### 8. 나의 인생에는 수학과함께 https://www.acmicpc.net/problem/17265
동적 계획법
🔍 접근 방법 <br />
이 문제는 2차원 격자를 DFS로 완전탐색하며 모든 경로의 결과값을 계산하는 문제야

**핵심 포인트:**

- 홀수/짝수 칸의 역할 구분하기 (숫자 / 연산자)
- 숫자 → 연산자 → 숫자 순서대로 진행하기
- DFS로 모든 가능한 연산 결과를 탐색하기

**접근 방법:**

1. 시작점 (0,0)에서 출발해 오른쪽 또는 아래 방향으로만 이동
2. 현재 위치가 숫자라면 그대로 전달, 연산자라면 다음 숫자와 함께 연산
3. 도착점에 도달했을 때 최댓값과 최솟값을 각각 갱신

**주의사항:**

- 숫자와 연산자의 위치가 번갈아 나타나는 패턴을 반드시 지키기
- 연산 순서가 뒤섞이지 않도록 주의하자

💻 풀이 코드 1 <br />
```python
import sys

ap = -sys.maxsize
an = sys.maxsize

def DFS(y, x, p):
    global ap, an
    if y == n - 1 and x == n - 1:
        ap = max(ap, p)
        an = min(an, p)
        return

    for i in range(2):
        yy, xx = y + dy[i], x + dx[i]
        if yy == n or xx == n:
            continue

        if arr[y][x] == '*':
            DFS(yy, xx, p * arr[yy][xx])
        elif arr[y][x] == '+':
            DFS(yy, xx, p + arr[yy][xx])
        elif arr[y][x] == '-':
            DFS(yy, xx, p - arr[yy][xx])
        else:
            DFS(yy, xx, p)

n = int(input())
arr = [list(map(str, input().split())) for _ in range(n)]

dy = [0, 1]
dx = [1, 0]

for i in range(n):
    for j in range(n):
        if (i + j) % 2 == 0:
            arr[i][j] = int(arr[i][j])

DFS(0, 0, arr[0][0])
print(ap, an)
```

📝 코드 설명 <br />
우선 sys.maxsize를 이용해 초기 최댓값 ap와 최솟값 an을 설정해줘

이 값들은 모든 경로를 탐색하면서 갱신될 대상이야

DFS 함수는 현재 위치 (y, x)와 지금까지 계산된 값 p를 인자로 받아

목표 위치 (n-1, n-1)에 도달하면, 그때까지 계산된 값 p를 최대값/최솟값 후보로 갱신하고 종료

이후 두 방향(오른쪽, 아래쪽)으로 이동하면서 재귀적으로 DFS를 진행해줘

현재 위치에 있는 값이 연산자라면, 다음 숫자칸과 연산을 수행한 값을 넘기면서 DFS를 이어가고, 숫자라면 그대로 값을 넘겨줘

입력에서 숫자는 (x+y) 합이 짝수인 칸에만 오므로,

arr 배열을 순회하면서 그런 칸에 있는 문자열을 정수형으로 바꿔주면돼

마지막으로 (0, 0)에서 시작하여 모든 경로를 탐색한 후, 최대값과 최소값을 출력하면 끝!
📊 복잡도 분석 <br />
시간 복잡도: O(2^(2n))
공간 복잡도: O(n^2)
⚡ 최적화 팁
1. 수행 순서 관리하기:연산자와 숫자가 교대로 나타나므로 위치에 따라 형식을 미리 처리해두면 연산 분기 처리가 쉬워진다!
2. DFS 가지치기:중간에 불필요한 연산 가지치기를 통해 시간 단축
3. 입력 처리 최적화하기:숫자만 미리 int로 바꿔두는 전처리 필수!
🎯 학습 포인트 <br />
- 2차원 격자에서도 DFS가 유효하게 쓰일 수 있다는 점을 학습하기
- 연산이 포함된 경로 탐색 문제에서는 값을 인자로 넘기는 방식으로 관리해준다
- 홀짝 위치를 이용한 조건 분기 아이디어 생각하기!

### 보너스1 - 과자 나눠주기 - https://www.acmicpc.net/problem/16401
[이분탐색]
🔍 접근 방법 <br />
문제 자체는 이해하기 쉬워.

조카 M명에게 과자 N개를 나눠주려고 하는데,

과자는 자를 수 있고 모든 조카에게 길이가 같은 과자 하나씩 주고 싶을 때,

가장 길게 나눠줄 수 있는 최대 길이는? 이라고 이해하면될거같아.

처음엔 그냥 나눠보는 식으로 접근할 수 있겠지만,

이건 가능한 길이를 기준으로 탐색하는 전형적인 이분 탐색 문제라고 볼 수 있지.

핵심 포인트:

- 길이를 기준으로 가능한지 확인하는 결정
- 탐색 대상: 길, 조건: 길이 x로 잘랐을 때 M명 이상에게 줄 수 있는가
- 조건을 만족하는 최대 길이를 찾는 것이 우리의 목적!

접근 방법:

1. 과자 길이 리스트를 받고, 탐색 범위를 1 ~ 최대 과자 길이로 설정하기
2. 중간값(mid)을 기준으로 과자들을 나눠봤을 때,

총 몇 명에게 줄 수 있는지를 계산해봐

1. 만약 조카 수 이상 줄 수 있다면 → 가능한 더 긴 길이가 있을 수 있으니 오른쪽 탐색
2. 못 주면 → 길이가 너무 길었다는 뜻 → 왼쪽 탐색
3. 그 과정을 반복해서 가능한 최대 길이를 이분 탐색으로 찾아내면돼!

주의사항:

- 과자의 길이가 0이 될 수는 없는거 이해하지? 탐색 시작을 start = 1로 설정해야해
- M명이 많을수록, 길이는 작아질 가능성이 높다를 기억해둬


💻 풀이 코드 1 <br />
```python
M, N = map(int, input().split())
ls = list(map(int, input().split()))

def binary_search(array):
    min = 1
    end = max(ls)

    while min <= end:
        cnt = 0
        mid = (min + end) // 2

        for cookie in ls:
            cnt += cookie // mid

        if cnt >= M:
            min = mid + 1
        else:
            end = mid - 1

    return end

print(binary_search(ls))
```

📝 코드 설명 <br />
먼저 입력을 받고, 이분 탐색을 위한 시작점(start=1)과 끝점(end=max(ls))을 잡아줘.

그다음 mid값을 과자의 길이 후보로 생각하고,

모든 과자를 해당 길이로 잘랐을 때 몇 개 나오는지를 확인해.

이렇게 잘라서 나온 조각 수가 M명 이상이면

이 길이로 나눠줄 수 있네?라고 생각을 할수 있고,

그러면 더 길게도 나눠줄 수 있을지 시도해보는 거고,

반대로 부족하면 길이가 너무 길었다는 의미니까 길이를 줄여.

이걸 반복해서 탐색을 좁혀가면 결국

조건을 만족하는 가장 긴 길이가 최종 정답을 구할 수 있어.
📊 복잡도 분석 <br />
시간 복잡도: O(N log L)
공간 복잡도: O(N)
⚡ 최적화 팁
1. 초기 탐색 범위 설정: start = 1, end = max(과자 길이)
2. 카운팅 방식 최적화: cookie / mid → 나눠질 수 있는 조각 수 빠르게 계산
3. 조건 판단: >= M일 때만 길이를 늘리자 (우측 탐색)
🎯 학습 포인트 <br />


- 이분 탐색은 꼭 정렬된 배열에만 쓰는 게 아니다!→ 이렇게 정답의 범위가 연속된 수일 때도 잘 쓰여
- 결정 문제 형태로 바꿔서 탐색하는 패턴 이해해야해
- mid가 정답이 아닐 수도 있다는 점 유의하기
🔗 관련 문제
- “가장 크거나 작게”, “최대 길이”, “최소 비용”처럼 ~할 수 있는 최대/최소값을 구하라가 나온다면→ 이분 탐색을 떠올려 보기!
- 가능한가 아닌가를 판단하는 조건을 정확하게 만들어야해
- 실수 연산을 쓰지 않고, 정수 연산으로 정밀하게 계산하는 습관을 들이는것이 다른 문제들을 풀때도 도움이 될거야

### 보너스 2 - CD - https://www.acmicpc.net/problem/4158

set 교집합 연산으로 빠르게 겹치는 CD 찾기


🔍 접근 방법 <br />
이 문제는 "A와 B가 각각 가진 CD 목록 중, 겹치는 CD가 몇 개인지를 구하라"는 문제야.
여기서 핵심은:

CD 수는 최대 1,000,000장.

정렬되어 주어지는 것도 아니고, 그냥 쭉 입력됨.

그러니까 정렬+이진탐색을 쓰거나, 해시 기반 집합 연산을 써야 해.

우리가 사용한 이 코드는 바로 두 개의 set을 만들어놓고,
서로의 교집합을 이용해서 겹치는 CD 개수를 구하는 구조야.

파이썬에선 set 자료구조가 해시 기반이라
원소 하나를 찾는 데 O(1) 이렇게 처리하는 게 매우 효율적이지.
💻 풀이 코드 1 <br />

```python
import sys
input=sys.stdin.readline
while True:
    n,m=map(int,input().split())
    cd_n={int(input()) for _ in range(n)}
    cd_m={int(input()) for _ in range(m)}
    if n==0 and m==0:
        break
    print(len(cd_n&cd_m))
```

📝 코드 설명 <br />
- 여기서는 두 입력을 `set`으로 받아서 교집합 연산(`&`)을 사용하죠.
- Python의 `set`은 내부적으로 해시 테이블로 구현돼 있어서,
- 원소 삽입/탐색/삭제 모두 평균 시간복잡도가 **O(1)**입니다.
- 교집합 연산도 내부적으로 빠르게 처리됩니다.
📊 복잡도 분석 <br />
시간 복잡도: O(n log n) or O(n log m)
공간 복잡도: O(n)
⚡ 최적화 팁
1. 교집합은 파이썬이 다 해준다, set1 & set2 한 줄이면 교집합 개수를 바로 구할 수 있다. 반복문이나 이진 탐색도 필요 없다
2. 중복 자동 제거 덕에 따로 정렬이 필요 없다
3. 불필요한 계산을 줄이려면 종료 조건 먼저 확인, if n == 0 and m == 0: break 는 입력 읽기 전에 넣는 게 조금 더 안전하지만, 이 풀이에서는 어차피 모든 입력을 다 받고 나서 비교하니 성능 상 문제가 없다

[Practical Tips]
- 알고리즘 문제 풀 때는 항상 자료 구조부터 고민
- 면접에서는 왜 set을 썼는지 설명, 무조건 빠르니까 썼다가 아니라, 중복 제거, 교집합 연산, 평균 시간복잡도 O(1)조회 성능
🎯 학습 포인트 <br />


- set 연산의 강력함
- 같은 문제라도 리스트로 풀면 O(nlogn)이나 O(n^2)이지만, set으로 바꾸면 O(n)수준까지도 줄어든다.
- 간결함과 성능의 균형: 파이썬의 고급 문법은 성능과 코드 간결함을 동시에 잡을 수 있게 해준다.

### 보너스3 - 225. Implement Stack using Queues - https://leetcode.com/problems/implement-stack-using-queues/description/

자료구조의 성격을 역으로 구현하는 전형적 스왑
🔍 접근 방법
이 문제는 Queue만을 사용해서 StacK의 동작을 흉내내는 문제야.

Queue는 FIFO(First-In-First-Out),
Stack은 LIFO(Last-In-First-Out)이죠.

즉, 먼저 들어온 데이터를 나중에 꺼내야 하므로,
Queue의 성격을 비틀어서 Stack처럼 동작하게 만들어야 합니다.

LeetCode의 문제에서는 다음 4가지 연산을 구현
- push(x) → 스택에 값 x 추가
- pop() → 가장 마지막에 넣은 값 제거
- top() → 가장 마지막에 넣은 값 조회
- empty() → 비었는지 확인

핵심 포인트:
• Queue와 Stack의 동작 원리 차이를 정확히 이해할 것
• Queue 1개로도 가능하지만, 보통은 2개 사용하는 게 더 명확함
• Push할 때 모든 순서를 정렬해두면 Pop이 빠름. 혹은 그 반대 전략도 가능

접근 방법 (2개의 큐 사용)
1. push 시에는 보조 큐에 새 값을 넣고, 기존 큐를 전부 옮겨서 새 값이 앞에 오도록 재정렬
2. 그런 뒤, 큐를 스왑해줌 -> main queue가 항상 최신 상태 유지
3. pop이나 top은 큐의 맨 앞 요소로 처리 가능, 즉시 처리.
4. empty는 main queue가 비었는지 체크

주의사항:
- push 연산이 O(n)이 되긴 하지만, pop과 top은 O(1)이라 균형이 맞아
- 시간복잡도와 스왑 전략을 꼼꼼히 확인해보자
💻 풀이 코드 1

```python
from collections import deque

class MyStack:
    def __init__(self):
        self.q1 = deque()
        self.q2 = deque()

    def push(self, x: int) -> None:
        self.q2.append(x)
        while self.q1:
            self.q2.append(self.q1.popleft())
        self.q1, self.q2 = self.q2, self.q1

    def pop(self) -> int:
        return self.q1.popleft()

    def top(self) -> int:
        return self.q1[0]

    def empty(self) -> bool:
        return not self.q1
```

📝 코드 설명
- `push`: 새 값을 q2에 넣고, 기존 q1 내용을 q2 뒤에 붙인 다음 스왑
- `pop`: q1의 맨 앞 값을 제거 → LIFO 구조 유지됨
- `top`: q1의 첫 번째 값 반환
- `empty`: q1이 비었는지 체크
📊 복잡도 분석
시간 복잡도: - push: O(n) - pop: O(1) - top: O(1) - empty: O(1)
공간 복잡도: O(n)
⚡ 최적화 팁
1. 한 큐로도 구현 가능하지만 복잡해짐
- push 연산 때 큐를 순환시키면 가능하지만 가독성이 떨어지고 유지보수에 불리
2. 스왑 방식은 직관성과 효율의 균형
- push가 O(n)이어도 나머지 연산이 빠르기 때문에 실전에서 자주 쓰임
3. 데이터 구조 시뮬레이션은 그림을 그려가며 이해
- 문제 풀 때, 직접 큐에 값이 어떻게 이동하는지 종이에 써보면 이해가 빨라

[Practical Tips]
- 이런 시뮬레이션 문제는 면접에서 '자료구조 이해도'를 체크할 때 아주 자주 나와
- 예전 카카오, 쿠팡, 우아한형제들 같은 회사의 실무 코딩테스트에서도 자주 등장
- 실제 서비스에서도 종종 queue나 stack의 동작을 흉내내거나, swap 전략을 써야 할 상황 충분히 마주할 수 있어! (브라우저 히스토리, 미리보기 기능 등)
🎯 학습 포인트
- Queue와 Stack의 차이를 근본적으로 이해하는 게 중요해
- Python의 `deque`는 queue와 stack 양쪽에 모두 활용 가능
- 

### 보너스 4 - 학생 인기도 측정 - https://www.acmicpc.net/problem/25325

정렬
🔍 접근 방법
이 문제는 정렬/구현을 활용하는 문제입니다.

핵심 포인트:

- 입력된 이름 - 사전처럼 생각하기
- 이름 빈도 카운트는 dict로 처리
- 정렬 기준은 (빈도 수 내림차순, 이름 오름차순)

접근 방법:

1. 첫 줄 입력 → 학생 수 n

2. 이름 리스트 받기 → 이름 사전 생성 (dict 초기화)

3. 나머지 n줄에서 각 줄마다 등장한 이름마다 카운트 증가

4. 이름들을 빈도 기준 정렬 후 출력

주의사항:

- 등장하지 않은 이름? 여기선 그럴 필요 없음
- 입력된 이름 중 실제로 나온 것만!!
💻 풀이 코드 1

```pytohn
from collections import defaultdict

n = int(input())
names = input().split()

count = defaultdict(int)

# 이름 후보 등록
for name in names:
    count[name] = 0

# 투표 카운트
for _ in range(n):
    votes = input().split()
    for name in votes:
        count[name] += 1

# 정렬 기준: 빈도 내림차순, 이름 오름차순
sorted_names = sorted(count.items(), key=lambda x: (-x[1], x[0]))

# 출력
for name, c in sorted_names:
    print(name, c)
```

📝 코드 설명
-
📊 복잡도 분석
시간 복잡도: O(N² + N log N) = O(N^2)
공간 복잡도: O(N)
⚡ 최적화 팁
- 정렬 조건 여러 개: (빈도 내림차순, 이름 오름차순)은 key=lambda x: (-x[1], x[0]) 로 한 번에 가능
- collections.defaultdict()
🎯 학습 포인트
1. 정렬 기준이 복합적일 때는 Lambda함수를 잘 사용해야한다.
2. dict는 등장 횟수 세는 데 매우 자주 사용
3. 카운트 후 정렬, 인기/빈도 관련 문제 정말 많이 나오는 패턴이니까 기본적으로 이해하고 있기
🔗 관련 문제
- 대회나 시험에서 빈도 카운트 → 바로 dict 또는 Counter
- 이름이 오름차순으로 묶일 수 있으므로, 사전 순 정렬 기준
- defaultdict는 실무에서도 깔끔한 코드 만들 때 유용하게 쓰이니 잘 써봅시당


### 보너스 4 - 임스와 함께하는 미니게임 - https://www.acmicpc.net/problem/25757
해시
🔍 접근 방법
이 문제는 해시 (중복 제거 + 규칙 계산)을 활용하는 문제입니다.

- 중복되지 않은 플레이어 수를 세고
- 게임 종류 따라 나눌 수 있는 팀 수 또는 게임 수 정리

핵심 포인트:

- 같은 사람은 여러 번 등장해도 1번으로 쳐야함. 어떻게 할까요?
- 게임 종류에 따라 게임당 필요한 인원 수 다름

접근 방법:

1. 첫 줄 입력: N = 플레이어 수, game_type = 게임 종류

2. 플레이어 이름 N개 입력 → 중복 제거 (set)

3. game_type에 따라 나눌 수 있는 게임 수 = 유니크 인원 수 // 필요한 인원 수

주의사항:

- 친구 이름은 중복될 수 있지만 1명만 셈
- Print(최대한 많은 게임 수)
💻 풀이 코드 1
```python
n, game_type = input().split()
n = int(n)
players = set()

for _ in range(n):
    players.add(input().strip())

unique_count = len(players)

# 인원수 규칙
rule = {'Y': 1, 'F': 2, 'O': 3}
result = unique_count // rule[game_type]

print(result)
```

# set()으로 중복 제거
# rule[game_type]으로 필요 인원 수를 바로 가져옴
# 최대한 많이 게임을 만들기 위해선 몫을 구하면 됨 (//)
📝 코드 설명
-
📊 복잡도 분석
시간 복잡도: O(N)
공간 복잡도: O(N)
⚡ 최적화 팁
1. set 사용: 중복 처리
2. 게임 유형마다 필요한 인원을 dict로 미리 저장하면 가독성이 좋아지고 조건문을 덜 쓸 수 있습니다!
🎯 학습 포인트
- 게임 문제는 "규칙 → 수학적 계산" 형태로 정리하는 연습 많이 해봅시다!
- 중복 제거에는 무조건 set!
🔗 관련 문제
- "중복 제거 + 최대 팀 수" 문제 나오면 대부분은 set + 나눗셈
- 문제에 나오는 "최대"라는 말은 몫 계산 or 그리디를 암시한다고 생각하고 문제를 읽어나가면 best
- 쉬운 문제입니다!
