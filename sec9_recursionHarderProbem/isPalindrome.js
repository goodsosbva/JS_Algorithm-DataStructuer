// isPalindrome('awesome') // false
// isPalindrome('foobar') // false
// isPalindrome('tacocat') // true
// isPalindrome('amanaplanacanalpanama') // true
// isPalindrome('amanaplanacanalpandemonium') // false

function isPalindrome(strs){
    // add whatever parameters you deem necessary - good luck!
    // console.log(strs, strs[0], strs[strs.length - 1])
    if (strs.length === 1 || strs.length === 0) {
        return true
    } 
  
    if (strs[0] == strs[strs.length - 1]) {
        strs = strs.slice(1, -1)
        return isPalindrome(strs)
    }
    
    else {
        return false
    }
}
  
console.log(isPalindrome('tacocat'))