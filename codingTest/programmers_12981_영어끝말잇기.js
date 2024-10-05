function solution(n, words) {
  let usedWord = new Set();
  let peoples = new Array(n).fill(0);

  usedWord.add(words[0]);
  peoples[0] += 1;
  let lastWord = words[0];
  let cnt = 0;

  for (let i = 1; i < words.length; i++) {
    cnt = (cnt + 1) % n;
    let currentWord = words[i];

    if (usedWord.has(currentWord)) {
      return [cnt + 1, peoples[cnt] + 1];
    }

    if (lastWord[lastWord.length - 1] !== currentWord[0]) {
      return [cnt + 1, peoples[cnt] + 1];
    }

    usedWord.add(currentWord);
    peoples[cnt] += 1;
    lastWord = currentWord;
  }

  return [0, 0];
}
