n, game = input().split()
n = int(n)

player_dic = {}
game_number = -1
if game == 'Y':
    game_number = 1
elif game == 'F':
    game_number = 2
else:
    game_number = 3

players = 0
answer = 0
for _ in range(n):
    player = input()

    if player not in player_dic:
        player_dic[player] = 1
        players += 1

    if players == game_number:
        answer += 1
        players = 0

print(answer)