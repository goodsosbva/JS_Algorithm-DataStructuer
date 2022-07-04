function averagePair(arr, avg){
    // add whatever parameters you deem necessary - good luck!
    for (let i = 0; i < arr.length; i++){
        for (let j = i + 1; j < arr.length; j++){
            var chkAvg = arr[i] + arr[j] / 2;
            if (chkAvg === avg) {
                return true
            }
        }
    }
    return false
}

function averagePair1(arr, num){
    let start = 0
    let end = arr.length-1;
    while(start < end){
      let avg = (arr[start]+arr[end]) / 2 
      if(avg === num) return true;
      else if(avg < num) start++
      else end--
    }
    return false;
  }
// [-1,0,3,4,5,6], 4.1 false
// [1,2,3], 2.5 true
console.log(averagePair([-1,0,3,4,5,6], 4.1))