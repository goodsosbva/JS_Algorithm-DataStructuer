n, m = input().split()
n = int(n)
m = int(m)

def sosu(n, m):
    is_prime = [i for i in range(m + 1)]
    is_prime[0] = 0,
    is_prime[1] = 0
    answer = []

    for i in range(2, int(m ** 0.5) + 1):
        if is_prime[i] == 0:
            continue

        for j in range(i * i, m + 1, i):
            is_prime[j] = 0

    for i in range(n, m + 1):
        if is_prime[i] != 0:
            answer.append(i)

    return answer

answer_list = sosu(n, m)
for i in answer_list:
    print(i)
