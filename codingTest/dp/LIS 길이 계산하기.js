function solution(nums) {
    const n = nums.length;

    const dp = Array(n).fill(1);

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }

    return Math.max(...dp);
}

const nums = [1,4,2,3,1,5,7,3];
console.log(solution(nums));