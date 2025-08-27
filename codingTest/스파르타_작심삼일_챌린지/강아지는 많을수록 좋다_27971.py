n, m, a, b = map(int, input().split())

ranges = []
for _ in range(m):
    r = list(map(int, input().split()))
    ranges.append(r)

visited = set()
q = [(n, 0)]
visited.add(n)

answer = -1

def isRanges(x):
    for r1, r2 in ranges:
        if r1 <= x <= r2:
            return True
    return False

while q:
    n, m = q.pop(0)

    if n == 0:
        answer = m
        break

    for step in [a, b]:
        if n - step >= 0 and n - step not in visited and not isRanges(n - step):
            q.append((n - step, m + 1))
            visited.add(n - step)

print(answer)

