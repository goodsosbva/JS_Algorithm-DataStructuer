function linearSearch(arr, val){
    // add whatever parameters you deem necessary - good luck!
    let idx = 0
    for (let i of arr){
        if (i === val) {
            return idx
        }
        idx++;
    }
    return -1;
  }