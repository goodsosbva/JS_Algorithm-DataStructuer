n = int(input())

target = list(input())

must_strs = []
for i in range(len(target)):
    if target[i] == '*':
        must_strs.append(target[:i])
        must_strs.append(target[i + 1:])
        break

for _ in range(n):
    strs = list(input())
    is_continue = False

    if len(must_strs[0]) + len(must_strs[1]) > len(strs):
        print('NE')
        continue

    for j in range(len(must_strs[0])):
        if strs[j] != must_strs[0][j]:
            print('NE')
            is_continue = True
            break

    if is_continue:
        continue

    reserved_strs = list(reversed(strs))
    reserved_must_strs = list(reversed(must_strs[1]))

    for j in range(len(reserved_must_strs)):
        if reserved_must_strs[j] != reserved_strs[j]:
            print('NE')
            is_continue = True
            break

    if is_continue:
        continue
    else:
        print('DA')

