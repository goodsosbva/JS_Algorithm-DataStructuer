# 작심삼일 챌린지

#### !! 리드미 올리는 코드는 시니어 정답 코드
#### !! 파일로 올리는건 내가 낸 정답 코드

### 1. 소수 구하기 https://www.acmicpc.net/problem/1929
### 2. 안전 영역 https://www.acmicpc.net/problem/2468
- 스파르타 시니어 코드
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
🔍 접근 방법 (시니어 설명)
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
- target < 추의 무게 이 조건이 딱 걸리는 시점이 핵심 분기점이야
💻 풀이 코드 1
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
📝 코드 설명
이 코드는 정렬 + 누적합 + 조건문만으로 문제를 해결할 수 있어.

처음에 target = 1로 시작하는 이유는, 기본적으로 1원을 만들 수 있는지 없는지부터 따져보기 위해서야.

이후 반복문을 돌면서, 현재 추(x)가 지금까지 만들 수 있는 범위보다 작거나 같으면 그걸 추가해서 target을 확장해줘.

예를들어서, target이 4인데 다음 추가 3이면 → 1~6까지 만들 수 있게 되는 거지!

반대로, 다음 추가 target보다 크면 → 그 추로는 target을 만들 수 없기 때문에, 거기서 바로 종료하면돼

결과적으로 반복이 끝났을 때의 target이 우리가 만들 수 없는 최소 무게가 되는 거야.
📊 복잡도 분석
시간 복잡도: O(n log n)
공간 복잡도: O(n)
⚡ 최적화 팁
1. 정렬우선: 가추를 작은 값부터 사용해야 그리디 전략이 제대로 작동할 수 있어
2. target 누적만으로 해결: 별도의 배열이나 조합 계산 없이, 누적합만으로 측정 가능한 범위를 관리할 수 있어
3. 빠른 종료 전략: target보다 큰 수가 나오면 바로 종료하면 되니까, 불필요한 반복 없이 성능도 좋아
🎯 학습 포인트
- 그리디 알고리즘의 정렬 기반 접근은 필수로 알아둬야해
- 누적합과 비교를 활용한 범위 확장! 조합 계산 없이 문제를 해결할 수 있어!
- 조건문 하나로 절묘하게 분기되는 로직을 파악하는 감각 키우기
🔗 관련 문제
- 이런 유형은 “추”, “동전”, “무게” 같은 키워드가 나오면 정렬 + 누적합 + 그리디 조합을 떠올려야 해
- 가장 작은 경우부터 고려하며 조건을 점검하는 방식은 좋은 전략이야
- 문제 조건이 간단해 보이지만, 조합을 쓰면 시간 초과 나고 그리디로 풀면 한 줄 조건문으로 깔끔하게 풀리는 문제라는 걸 익혀두면 실전에서 시간 아낄 수 있어


### 6. JadenCase 문자열 만들기 https://school.programmers.co.kr/learn/courses/30/lessons/12951?language=python3
#### 시니어 코드
💻 풀이 코드 1
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
📊 복잡도 분석
시간 복잡도: O(N)
공간 복잡도: O(N)
⚡ 최적화 팁
1. [공백 유지]: ' '.join()을 사용하면 split할 때 생긴 공백 구조를 자연스럽게 되살릴 수 있어
2. [빈 문자열 처리]: 빈 문자열에 capitalize()를 적용해도 에러가 나지 않으므로 따로 조건 분기 필요가 없다~
3. [메서드 활용]: 직접 구현하지 말고 capitalize()를 적극 활용하면 훨씬 깔끔하다
🎯 학습 포인트
- 문자열에서 단어별로 특정 포맷을 적용하는 방법은 여러가지이니까 도전해봐
- split-join 패턴의 유용성을 익혀봐
- 문자열 메서드 capitalize()는 기본이니 꼭 알아두자
🔗 관련 문제
- 문자열 조작 문제에서는 split과 join으로 공백 문제를 깔끔히 다룰 수 있다
- 연속된 공백이나 앞뒤 공백을 보존해야 할 때는 반드시 split(’ ’)처럼 명시적 구분자를 써야 함을 잊지말자
- 문자열 포맷팅은 직접 구현보다 내장 메서드를 활용하는 게 훨씬 안정적이고 빠르다!
