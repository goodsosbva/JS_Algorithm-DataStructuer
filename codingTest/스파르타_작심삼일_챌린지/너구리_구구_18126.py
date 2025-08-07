n = int(input())

graph = [[] for _ in range(n + 1)]
for i in range(n - 1):
    a, b, length = list(map(int, input().split()))
    graph[a].append([b, length])
    graph[b].append([a, length])

max_length = 0
visited = [False] * (n + 1)
def dfs(node, length):
    global max_length
    visited[node] = True
    max_length = max(max_length, length)

    for n, c in graph[node]:
        if not visited[n]:
            dfs(n, length + c)


if n == 1:
    print(0)
else:
    dfs(1, 0)
    print(max_length)
