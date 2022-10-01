var test1 = 'qabase' // false
var test2 = 'abc1@bc11' // true

function chkId(strs) {
    const t1 = strs.match(/[a-zA-Z]/g)
    const t2 = strs.match(/[0-9]/g)
    const t3 = strs.match(/[+=%_!@#$^&*?]/g)
    const t4 = strs.length;

    if (t1 && t2 && t3 && t4 >= 8) {
        return true
    }
    return false;
}

console.log(chkId(test1))