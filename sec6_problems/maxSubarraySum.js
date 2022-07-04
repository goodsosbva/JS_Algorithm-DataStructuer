function maxSubarraySum(arr, n){
    // add whatever parameters you deem necessary - good luck!
    var maxValue = 0;
    let st = 0;
    let end = n - 1;
    
    if (arr.length < n) {
        return null;
    }
    while (true){
        if (end > arr.length) {
            break
        } 
        let subArr = arr.slice(st, end + 1)
        let summary = subArr.reduce(function(a, b) {return a+b;}, 0)
        console.log(summary)
        maxValue = Math.max(maxValue, summary)
        st++;
        end++;
    }
    return maxValue
}
  
console.log(maxSubarraySum([100,200,300,400], 2)) // 700