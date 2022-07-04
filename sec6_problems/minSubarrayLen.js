function minSubarrayLen1(arr, n){
    let answer = -1;
    arr.sort();
    console.log(arr);
    let left = 0;
    let right = 0;
    while (left < arr.length) {
        let candiLength = (right + 1) - left;
        let tmp = arr.slice(left, right + 1)
        let summary = tmp.reduce(function(a, b) {return a+b;}, 0)
        if (n > summary){
            right++
        }
        else if (n < summary){
            left--
        }
        else{
            answer = Math.min(answer, candiLength)
        }
    }
    return answer
}


function minSubarrayLen(nums, sum) {
    let total = 0;
    let start = 0;
    let end = 0;
    let minLen = Infinity;
   
    while (start < nums.length) {
        // if current window doesn't add up to the given sum then
        // move the window to right
        console.log(total, start, end)
        if (total < sum && end < nums.length) {
            total += nums[end];
            end++;
        }
        // if current window adds up to at least the sum given then
        // we can shrink the window 
        else if (total >= sum) {
            minLen = Math.min(minLen, end - start);
            total -= nums[start];
            start++;
        }
        // current total less than required total but we reach the end, need this or else we'll be in an infinite loop 
        else if (end >= nums.length) {
            break;
        }
    }
   
    return minLen === Infinity ? 0 : minLen;

}

console.log(minSubarrayLen([2,3,1,2,4,3], 7))