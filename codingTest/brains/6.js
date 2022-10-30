function one (a) {
    var ans = []
    for (let i = a.length - 1; i >= 0; i--) {
        ans.push(a[i]);
    }

    return ans;
}

var a = [1, 2, 3, 4, 5];
function two(a) {
    var tmp = []

    for (let i = a.length - 1; i >= 0; i--) {
        tmp.push(a[i]);
    }

    return tmp
}

var a = two(a)
console.log(a);
