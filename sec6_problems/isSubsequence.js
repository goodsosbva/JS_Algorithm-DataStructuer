function isSubsequence(strs1, strs2) {
    // good luck. Add any arguments you deem necessary.
    let one = 0;
    let two = 0;
    while (true){
        if (one > strs1.length) {
            break
        } 
        if (strs1[one] === strs2[two]) {
            one++;
            two++;
        }
        else {
            two++;
        }
    }
    if (one > strs1.length) {
            return true
        } 
    return false
    
}


function isSubsequence1(str1, str2) {
    if(str1.length === 0) return true
    if(str2.length === 0) return false
    if(str2[0] === str1[0]) return isSubsequence(str1.slice(1), str2.slice(1))  
    return isSubsequence(str1, str2.slice(1))
  }
  
console.log(isSubsequence('hello', 'hello world')) // true