n = int(input())

numbers = list(map(int, input().split()))

cur_number = 0
numbers.sort()

for i in numbers:
    if i > cur_number + 1:
        break

    cur_number += i

print(cur_number + 1)