while True:
    n, m = map(int, input().split())
    if n == 0 and m == 0:
        break

    cd_dic = {}
    answer = 0

    for _ in range(n):
        cd_number = int(input())

        if cd_number not in cd_dic:
            cd_dic[cd_number] = 1

    for _ in range(m):
        cd_number = int(input())

        if cd_number in cd_dic:
            answer += 1

    print(answer)