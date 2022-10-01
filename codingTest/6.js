var strs0 = '20200309_최종_수정.png';
// var newStrs1 = '20200309_최종_수정.jpg';
var newStrs2 =  '20200309_최종본_수정.png';

var strs = strs0.split('.');
var strs2 = newStrs2.split('.');

var name0 = strs[0];
var ext0 = strs[1];

var name2 = strs2[0];
var ext2 = strs2[1];

var isSame = true
var cnt = 1;
if (ext0 !== ext2) console.log(newStrs2);
else {
    // var names0 = name0.split('_');
    // var names2 = name2.split('_');

    if (name0.length !== name2.length) console.log(newStrs2);
    else {
        for (let i = 0; i < name0.length; i++){
            // console.log(name0[i], name2[i])
            if (name0[i] !== name2[i]) {
                console.log(newStrs2);
                isSame = false
                break
            }
        }
        if (isSame) {
            console.log(name2 + '[' + String(cnt) + ']' + ext2)
            cnt++;
        }
        
    }
}