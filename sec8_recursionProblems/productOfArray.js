// productOfArray([1,2,3]) // 6
// productOfArray([1,2,3,10]) // 60

function productOfArray(arr){
    if (arr.length === 0) {
        return 1
    }
    const tmp = arr[0];
    arr = arr.slice(1, arr.length);
    console.log(arr);
    return tmp * productOfArray(arr)
}

console.log(productOfArray([1,2,3]))