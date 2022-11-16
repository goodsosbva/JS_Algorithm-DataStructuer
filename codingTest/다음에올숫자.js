function solution(common) {
    var answer = 0;
    
    var nums = []
    for (let i = 0; i < common.length - 1; i++) {
        var diff = common[i + 1] - common[i];
        nums.push(diff);
    }
    // console.log(nums, common[nums.length])
    
    if (nums[0] === nums[1]) {
        return nums[0] + common[nums.length]
    } else {
        return (nums[1] / nums[0]) * common[nums.length]
    }
    return answer;
}
