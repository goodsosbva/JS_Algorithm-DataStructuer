a = "hi there it`s me"

function cnt(a) {
    var dic = {};
    console.log(a.split(" "))
    var lang = a.split(" ");

    for (l of lang) {
        if (dic[l] === undefined) {
            dic[l] = 1
        }
        else {
            dic[l]++;
        } 
    }
    return dic
}

console.log(cnt(a));