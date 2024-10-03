function solution(nums) {
  var answer = 0;

  const numSet = new Set(nums);
  const n = nums.length;

  const k = n / 2;

  answer = Math.min(numSet.size, k);
  return answer;
}
