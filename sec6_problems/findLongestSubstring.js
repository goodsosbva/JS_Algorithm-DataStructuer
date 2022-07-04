function findLongestSubstring(str) {
    let longest = 0;
    let seen = {};
    let start = 0;
   
    for (let i = 0; i < str.length; i++) {
      let char = str[i];
      // 현재 char이 중복이라면 start를 현재 char위치로 바꾸고,
      // 다시 찾아봐야 한다.
      if (seen[char]) {
        start = Math.max(start, seen[char]);
      }
      // 인덱스는 0부터 시작하므로 +1을 해주는 것
      longest = Math.max(longest, i - start + 1);
      // 현재 char의 위치를 딕셔너리를 이용해서 기억
      seen[char] = i + 1;
    }
    return longest;
  }