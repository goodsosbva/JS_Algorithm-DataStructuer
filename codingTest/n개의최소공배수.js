
//최대공약수 구하기
const gcd = (a, b) => {
  while (b > 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
};

//최소공배수 구하기
const lcm = (a, b) => {
  return (a * b) / gcd(a, b);
};

const solution = (arr) => {
  let answer = 1;
  for (let i = 0; i < arr.length; i++) {
    console.log(answer);
    answer = lcm(answer, arr[i]);
  }

  return answer;
};

// console.log(gcd(24, 18))
// console.log(lcm(24, 18))
console.log(solution([2, 6, 8, 14]));

