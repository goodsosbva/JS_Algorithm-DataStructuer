dx = [-1, -1, -1, 0, 0, 1, 1, 1]
dy = [-1, 0, 1, -1, 1, -1, 0, 1]

def bfs(w, h, x, y, visited, grid):
    queue = [(x, y)]
    visited.add((x, y))

    while queue:
        x, y = queue.pop(0)

        for i in range(8):
            nx = x + dx[i]
            ny = y + dy[i]

            if 0 <= nx < h and 0 <= ny < w:
                if grid[nx][ny] == 1 and (nx, ny) not in visited:
                    queue.append((nx, ny))
                    visited.add((nx, ny))

while True:
    w, h = map(int, input().split())
    if w == 0 and h == 0:
        break

    grid = [list(map(int, input().split())) for _ in range(h)]

    visited = set()
    answer = 0
    for i in range(h):
        for j in range(w):
            if grid[i][j] == 1 and (i, j) not in visited:
                bfs(w, h, i, j, visited, grid)
                answer += 1

    print(answer)
