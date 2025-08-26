import sys
sys.setrecursionlimit(10 ** 6)

n, m, a, b = map(int, input().split())

ranges = []
for _ in range(m):
    r = list(map(int, input().split()))
    ranges.append(r)

visited = set()
answer = float("inf")


def recursive(n, cnt):
    global answer
    global a
    global b
    global ranges

    if n == 0:
        answer = min(answer, cnt)
        return

    if n in visited:
        return
    visited.add(n)

    for [r1, r2] in ranges:
        if r1 <= n <= r2:
            return

    cnt += 1
    if n - a >= 0:
        recursive(n - a, cnt)
    if n - b >= 0:
        recursive(n - b, cnt)

    visited.remove(n)


recursive(n, 0)
print(answer if answer != float("inf") else -1)
"""
8 2 5 4
1 2
1 3

2
"""