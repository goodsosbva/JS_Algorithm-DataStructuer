def solution(positions, weights):
    house = list(zip(positions, weights))
    house.sort()

    total = sum(weights)
    target = total / 2

    cur = 0
    for pos, weight in house:
        cur += weight

        if cur >= target:
            return pos

    return


n = int(input())
positions = []
weights = []

for _ in range(n):
    x, w = map(int, input().split())
    positions.append(x)
    weights.append(w)


answer = solution(positions, weights)
print(answer)