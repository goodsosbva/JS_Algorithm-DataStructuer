def solution(land):
    length = len(land)
    
    for i in range(1, length):
        for j in range(4):
            isMaxs = []
            for a in range(4):
                if a == j: continue
                
                isMaxs.append(land[i - 1][a])
            land[i][j] = land[i][j] + max(isMaxs)

    return max(land[length - 1])
