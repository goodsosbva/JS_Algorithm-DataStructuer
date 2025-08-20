n = int(input())

students = list(input().split())

dic = {}
for s in students:
    dic[s] = 0

for _ in range(n):
    loves = list(input().split())

    for love in loves:
        dic[love] += 1

sorted_dic = sorted(dic, key=lambda x: dic[x], reverse=True)
for s_d in sorted_dic:
    print(s_d, dic[s_d])