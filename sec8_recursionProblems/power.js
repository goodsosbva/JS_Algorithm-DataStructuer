// power(2,0) // 1
// power(2,2) // 4
// power(2,4) // 16

function power(n, cnt){
    if (cnt === 0){
        return 1
    }
    return 2 * power(n, cnt - 1);
}