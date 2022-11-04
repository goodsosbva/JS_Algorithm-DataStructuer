function combination(arr, num){
  const res = [];
  if(num === 1) return arr.map((v) => [v]);

  arr.forEach((v, idx, arr) => {
    const rest = arr.slice(idx + 1);
    const combinations = combination(rest, num - 1);
    const attach = combinations.map((combination) => [v, ...combination]);
    res.push(...attach);
  })
  return res;
}


function solution(number) {
    var answer = 0;
    
    var res = combination(number, 3);
    for (r of res) {
        var sum = 0;
        for (n of r) {
            sum += n
        }
        
        if (sum === 0) {
            answer++;
        }
    }
    return answer;
}
