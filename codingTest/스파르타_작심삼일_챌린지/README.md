# 작심삼일 챌린지

#### !! 리드미 올리는 코드는 시니어 정답 코드
#### !! 파일로 올리는건 내가 낸 정답 코드

### 1. 소수 구하기 https://www.acmicpc.net/problem/1929
### 2. 안전 영역 https://www.acmicpc.net/problem/2468
- 스파트 시니어 코드
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

