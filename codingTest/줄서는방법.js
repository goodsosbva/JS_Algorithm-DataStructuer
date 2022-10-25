
const getPermutations = function (arr, selectNumber) {
  const results = [];
  if (selectNumber === 1) return arr.map((el) => [el]);
  // n개중에서 1개 선택할 때(nP1), 바로 모든 배열의 원소 return. 1개선택이므로 순서가 의미없음.

  arr.forEach((fixed, index, origin) => {
    const rest = [...origin.slice(0, index), ...origin.slice(index + 1)];
    // 해당하는 fixed를 제외한 나머지 배열
    const permutations = getPermutations(rest, selectNumber - 1);
    // 나머지에 대해서 순열을 구한다.
    const attached = permutations.map((el) => [fixed, ...el]);
    //  돌아온 순열에 떼 놓은(fixed) 값 붙이기
    results.push(...attached);
    // 배열 spread syntax 로 모두다 push
  });

  return results;
};

function solution1(n, k) {
  var answer = [];
  var arr = [];

  for (let i = 0; i < n; i++) {
    arr.push(i + 1);
  }

  let newArr = getPermutations(arr, n);

  if (newArr.length === 0) {
    return [];
  }
  answer.push(newArr[k - 1]);
  if (answer.length === 0) {
    return [];
  }
  return answer[0];
}

function solution(n, k) {
  var answer = [];
  let arr = [];
  for (let i = 1; i <= n; i++) arr.push(i);
  let fac = arr.reduce((acc, val) => acc * val, 1);
  k--;

  // 경우의 수의 원리를 이용한 문제풀이
  while (answer.length !== n) {
    fac = fac / arr.length;
    // console.log(fac);
    // 나열했을 때 몇 번째 경우의 수의 번째수를 사용했는지 알 수 있음 (팩토리알의 수학적 원리 이용)
    let temp = arr[Math.floor(k / fac)];
    answer.push(temp);
    // console.log(k, fac, Math.floor(k / fac));
    k = k % fac;
    // 선택한 숫자들으 제거하는 것
    arr = arr.filter((e) => e !== temp);
  }
  return answer;
}

console.log(solution(3, 5));

