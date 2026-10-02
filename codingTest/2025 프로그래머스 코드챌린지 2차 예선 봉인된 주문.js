function switch_to_number(str, dics) {
  let number = 0;
  for (const char of str) number = number * 26 + dics[char];
  return number;
}

function number_to_letter(num, letterByNumber) {
  let letter = '';

  while (num > 0) {
    const value = num - 1;
    letter = letterByNumber[(value % 26) + 1] + letter;
    num = Math.floor(value / 26);
  }

  return letter;
}

function solution(n, bans) {
    let answer_num = n;
    const dics = Object.fromEntries(
      'abcdefghijklmnopqrstuvwxyz'.split('').map((char, i) => [char, i + 1])
    );
    
    const letterByNumber = Object.fromEntries(
      'abcdefghijklmnopqrstuvwxyz'.split('').map((letter, index) => [index + 1, letter])
    );
    
    let new_bans = [];
    for (let i = 0; i < bans.length; i++) {
        const ban = switch_to_number(bans[i], dics);
        
        new_bans.push(ban)
    }
    
    new_bans.sort((a, b) => {return a - b});
    
    for (const ban of new_bans) {
      if (ban <= answer_num) answer_num++;
    }
    
    const answer = number_to_letter(answer_num, letterByNumber);
    return answer;
}
