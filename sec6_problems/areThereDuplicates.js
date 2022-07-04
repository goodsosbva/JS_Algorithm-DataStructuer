function areThereDuplicates1(...arr) {
    // good luck. (supply any arguments you deem necessary.)
    const arr1 = Object.values(arr);
    console.log(arr1)
    for (let i = 0; i < arr1.length; i++){
      // console.log(arr[i])
      var tmp = arr1.slice(i + 1, arr.length);
      console.log(tmp);
      if (tmp.includes(arr[i])) {
            console.log(arr[i], tmp, "true");
            return true
      }
       
    }
    console.log("false")
    return false
}

function areThereDuplicates(...args) {
    // Two pointers
    args.sort((a, b) => a > b);
    console.log(args);
    let start = 0;
    let next = 1;
    // 정렬을 했으니 이딴식으로 풀 수 있는것.
    while(next < args.length){
      if(args[start] === args[next]){
          return true
      }
      start++
      next++
    }
    return false
  }
  
areThereDuplicates(1, 2, 3)

// if ([2, 3].includes(1)) {
//     console.log("왜있냐")
// }