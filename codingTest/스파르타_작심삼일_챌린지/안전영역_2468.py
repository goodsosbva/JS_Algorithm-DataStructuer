import copy

n = int(input())

arr = []
answer = -1
max_value = -1

for _ in range(n):
    row = list(map(int, input().split()))
    arr.append(row)
    max_value = max(max_value, max(row))

dx = [0, -1, 0, 1]
dy = [1, 0, -1, 0]
def bfs(arr, visited, i, j):
    q = [[i, j]]

    while q:
        x, y = q.pop()
        visited[x][y] = True

        for i in range(4):
            nx = x + dx[i]
            ny = y + dy[i]

            if 0 <= nx < len(arr) and 0 <= ny < len(arr):
                if visited[nx][ny] == False and arr[nx][ny] > 0:
                    q.append([nx, ny])

    return visited



def safe_zone(rain, arr):
    ans = 0
    newArr = copy.deepcopy(arr)
    length = len(arr)
    for i in range(length):
        for j in range(length):
            newArr[i][j] = arr[i][j] - rain

    visited = [[False] * length for _ in range(length)]
    for i in range(length):
        for j in range(length):
            if newArr[i][j] > 0 and visited[i][j] == False:
                visited = bfs(newArr, visited, i, j)
                ans += 1

    return ans

for rain in range(max_value + 1):
    ans =  safe_zone(rain, arr)
    if ans > answer:
        answer = ans

print(answer)


