// 1
function reverse(arr) {
  
    if (arr.length === 0) {
        return ""
    }
    const tmp = arr.slice(-1, arr.length);
    arr = arr.slice(0, -1);
    // console.log(arr, tmp, arr.length);
    return tmp + reverse(arr)
}

console.log(reverse('awesome'));