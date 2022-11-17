# VScode 환경에서...
# 파이썬 확장을 설치 하신 이후
# 터미널을 통해 실행하면 결과값을 확인하실 수 있습니다.
N, K = input().split()

n = int(N)
k = int(K) - 1
num = k

circular = []
humans = []

circular = [i for i in range(1, n + 1)]

print(circular)
for i in range(n):
    if num < len(circular):
        # num번째 제거 인덱스가 전체 길이보다 작을 때는 해당 번째를 pop해주면 된다.
        humans.append(str(circular.pop(num)))
        num += k
    elif num >= len(circular):
        # num번째 제거 인덱스가 커지면 %를 써서 원형을 도는것처럼 구현했다.
        num = num % len(circular)
        humans.append(str(circular.pop(num)))
        num += k


# print(humans)
print("<", ", ".join(humans)[:], ">", sep='')