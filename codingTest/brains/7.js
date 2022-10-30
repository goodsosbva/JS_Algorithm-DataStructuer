var a = { a: 1, b: 2, c: 3 }

function cnt(a) {
    var cnt = 0;
    for (x in a) {
        cnt++;
    }

    return cnt;
}

console.log(cnt(a));