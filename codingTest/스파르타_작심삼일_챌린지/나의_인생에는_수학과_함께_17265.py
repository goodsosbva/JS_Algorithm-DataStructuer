import sys

dx = [0, 1]
dy = [1, 0]
expressions = []

def dfs(graphs, x, y, path):
    global expressions

    if x == len(graphs) - 1 and y == len(graphs[0]) - 1:
        expressions.append(path[:])
        return

    for i in range(2):
        nx = x + dx[i]
        ny = y + dy[i]

        if 0 <= nx < len(graphs) and 0 <= ny < len(graphs[0]):
                path.append(graphs[nx][ny])

                dfs(graphs, nx, ny, path)

                path.pop()

    return expressions


def calc_expressions(expressions):
    if not expressions:
        return None, None

    results = []
    for expr in expressions:
        result = calc_left_to_right(expr)
        results.append(result)

    return max(results), min(results)


def calc_left_to_right(expression):
    result = int(expression[0])

    i = 1
    while i < len(expression):
        operator = expression[i]
        operand = int(expression[i + 1])

        if operator == '+':
            result += operand
        elif operator == '-':
            result -= operand
        elif operator == '*':
            result *= operand

        i += 2

    return result


n = int(input())

graphs = []
max_answer = -1
min_answer = sys.maxsize

for i in range(n):
    graph = list(input().split())
    graphs.append(graph)

dfs(graphs, 0, 0, [graphs[0][0]])

max_answer, min_answer = calc_expressions(expressions)
print(max_answer)
print(min_answer)

