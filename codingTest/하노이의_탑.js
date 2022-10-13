// 먼저 n==1일 경우, 그저 src에서 dst로 원반을 옮기면 됩니다. 코드로 구현하면 arr.push([src,dst])가 될 것입니다.
// n>=2 일 경우, src에서 dst로 원반을 옮기려면 예시처럼 mid(중간지점) 에 돌을 잠시 옮겨두었다가 가야합니다. 크게 요약을 하면
// n번째 의 돌 (가장 밑에 깔려있는 돌)을 옮기기 위해서는 1번째부터 n-1번째의 돌까지 모두 mid에 옮겨두고
// n번째 돌을 src->dst로 옮기고
// mid -> dst을 옮기면 됩니다.
// 따라서 dp 함수는 n==1일때와, 점화식으로 구현하면 됩니다.

const answer = [];

const hanoi = (n, src, dst, mid) => {
  if (n === 1) answer.push([src, dst]);
  else {
    hanoi(n - 1, src, mid, dst);
    // console.log(answer, src, dst, n);
    answer.push([src, dst]);
    // console.log(answer);
    hanoi(n - 1, mid, dst, src);
  }
};

function solution(n) {
  hanoi(n, 1, 3, 2);

  return answer;
}

console.log(solution(3));
