m, n = map(int, input().split())
snacks = list(map(int, input().split()))

left = 1
right = max(snacks)
answer = 0

while left <= right:
    mid = left + (right - left) // 2

    distribution = 0
    for s in snacks:
        distribution += s // mid

    if distribution < m:
        right = mid - 1
    elif distribution >= m:
        left = mid + 1
        answer = max(answer, mid)

print(answer)
