function binarySearch(arr, val){
    // add whatever parameters you deem necessary - good luck!
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        var mid = parseInt((left + right) / 2);
        if (arr[mid] === val) {
            return mid;
        }
        else if (arr[mid] > val) {
            right = mid - 1;
        }
        else {
            left = mid + 1;
        }
    }
    
    return -1;
}
  
console.log(binarySearch([1,2,3,4,5], 2))