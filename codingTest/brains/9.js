function cnt(s) {
  var answer = [];
  var prev = s[0];
  var cnt = 0;
  var idx = 0;

  while (idx < s.length) {
    for (let j = idx; j < s.length; j++) {
      if (prev === s[j]) {
        cnt++;
        prev = s[idx];
        idx++;
      } else {
        answer.push(cnt);
        cnt = 1;
        prev = s[idx];
        idx++;
      }
    }

    answer.push(cnt);
    cnt = 1;
    prev = s[idx];
    idx++;
  }
  return answer;
}

s = [0, 0, 0, 1, 1, 1, 0, 1];
console.log(cnt(s));
