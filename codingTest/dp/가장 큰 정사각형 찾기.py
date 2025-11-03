def solution(board):
    n = len(board)
    m = len(board[0])
    
    for i in range(1, n):
        for j in range(1, m):
            x = board[i][j - 1]
            y = board[i - 1][j]
            diagonal = board[i - 1][j - 1]
            
            if board[i][j] == 1:
                board[i][j] = min(x, y, diagonal) + 1
    
    maxWidth = -1;
    for i in range(n):
        maxWidth = max(max(board[i]), maxWidth)
    answer = maxWidth * maxWidth
    return answer
