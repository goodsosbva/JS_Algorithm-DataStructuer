function countUniqueValues(arr){
    // add whatever parameters you deem necessary - good luck!
    const answer = []
    let prevNumber = -1
    for (let i = 0; i < arr.length; i++) {
        if (prevNumber !== arr[i]) {
            answer.push(arr[i])
            prevNumber = arr[i]
        }
        
    }
    return answer.length
}
  
countUniqueValues([1,1,1,2])