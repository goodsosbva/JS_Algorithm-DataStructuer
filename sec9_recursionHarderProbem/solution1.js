// 솔루션 1부
// 재귀 섹션 도전 과제 솔루션 1부
// Reverse 솔루션

function reverse(str){
	if(str.length <= 1) return str;
	return reverse(str.slice(1)) + str[0];
}
// isPalindrome 솔루션

function isPalindrome(str){
    if(str.length === 1) return true;
    if(str.length === 2) return str[0] === str[1];
    if(str[0] === str.slice(-1)) return isPalindrome(str.slice(1,-1))
    return false;
}
// someRecursive 솔루션

function someRecursive(array, callback) {
    if (array.length === 0) return false;
    if (callback(array[0])) return true;
    return someRecursive(array.slice(1),callback);
}
// flatten 솔루션

function flatten(oldArr){
  var newArr = []
  	for(var i = 0; i < oldArr.length; i++){
    	if(Array.isArray(oldArr[i])){
      		newArr = newArr.concat(flatten(oldArr[i]))
    	} else {
      		newArr.push(oldArr[i])
    	}
  } 
  return newArr;
}