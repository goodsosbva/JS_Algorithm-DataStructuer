from itertools import combinations

def solution(numbers):
    answer = 0
    print(list(combinations(numbers, 2)))

    summary = sum(numbers)
    for i in range(1, len(numbers)):
        subtracts = list(combinations(numbers, i))

        for sub in subtracts:
            print(list(sub))
            if summary - sum(list(sub)) * 2 == 0:
                answer += 1
    
    return answer

print(solution([1, 1, 1, 1]))