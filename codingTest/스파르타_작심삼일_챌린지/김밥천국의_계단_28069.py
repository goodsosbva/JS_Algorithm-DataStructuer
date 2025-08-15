import math

INF = 10**9

def climb_stair_for_kimbap_heaven(n, k):
    dp = [INF] * (n + 1)
    dp[0] = 0

    for i in range(n + 1):
        if i + 1 <= n:
            dp[i + 1] = min(dp[i + 1], dp[i] + 1)

        teleportation = i + math.floor(i / 2)
        if teleportation <= n:
            dp[teleportation] = min(dp[teleportation], dp[i] + 1)

    return dp


n, k = map(int, input().split())
dp = climb_stair_for_kimbap_heaven(n, k)

if dp[n] <= k:
    print('minigimbob')
else:
    print('water')
