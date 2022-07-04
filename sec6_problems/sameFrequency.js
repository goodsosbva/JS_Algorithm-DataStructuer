function sameFrequency(n1, n2){
    n1 = String(n1)
    n2 = String(n2)
    console.log(n1)
    // good luck. Add any arguments you deem necessary.
    if (n1.length != n2.length) {
        return false
    }
    
    const dic = {}
    for (let i = 0; i < n1.length; i++) {
      let letter = n1[i];
      // if letter exists, increment, otherwise set to 1
      dic[letter] ? dic[letter] += 1 : dic[letter] = 1;
    }
    
    console.log(dic)
    
    for (let i = 0; i < n2.length; i++) {
      let letter = n2[i];
      // can't find letter or letter is zero then it's not an anagram
      if (!dic[letter]) {
        return false;
      } else {
        dic[letter] -= 1;
      }
    }
  
    return true;
}
  
sameFrequency(181, 281) // true