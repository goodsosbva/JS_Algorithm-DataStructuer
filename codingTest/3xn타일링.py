
def solution(n):
    answer = [0,3,11]
    index = int(n/2)
    if n % 2 != 0: return 0
    if index < 3: return answer[index]

    for i in range(3, index+1):
    	# answer[i:j] -> answer에서 index가 i인 원소부터 j-1인 원소까지의 sub-array
        answer.append((3*answer[i-1]+sum(answer[1:i-1])*2+2)%1000000007)

    return answer[index]



print(solution(12))