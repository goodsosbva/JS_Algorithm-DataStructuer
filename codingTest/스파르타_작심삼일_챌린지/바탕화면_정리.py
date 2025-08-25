def solution(wallpaper):
    answer = []
    n = len(wallpaper)

    maps = []
    for i in range(n):
        m = list(wallpaper[i])
        maps.append(m)

    minX = len(maps[0])
    minY = len(maps)
    maxX = -1
    maxY = -1
    for x in range(len(maps)):
        for y in range(len(maps[0])):
            if maps[x][y] == '#':
                maxX = max(maxX, x)
                minX = min(minX, x)
                maxY = max(maxY, y)
                minY = min(minY, y)

    answer.extend([minX, minY, maxX + 1, maxY + 1])
    return answer


ans = solution(["..........", ".....#....", "......##..", "...##.....", "....#....."])
print(ans)