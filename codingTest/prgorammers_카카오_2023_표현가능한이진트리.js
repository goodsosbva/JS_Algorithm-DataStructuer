function makeBinayNumbers(number) {
    const binary = [];
    while (number > 0) {
      binary.push(number % 2);
      number = Math.floor(number / 2);
    }
    
    return binary.reverse();
}

function isValidTree(arr, pad, s = 0, e = arr.length + pad - 1) {
    
    if (s > e) return true;
    const m = Math.floor((s + e) / 2);

    const idx = m - pad;
    const bit = (idx >= 0 && idx < arr.length ? arr[idx] : 0);
    
    if (bit === 0) {
        for (let i = 0; i < arr.length; i++) {
            const pos = pad + i;
            if (pos >= s && pos <= e && arr[i] === 1) return false;
         }
    }
    
    return isValidTree(arr, pad, s, m - 1) && isValidTree(arr, pad, m + 1, e)
}

function solution(numbers) {
    
    const answer = [];

    for (let i = 0; i < numbers.length; i++) {
        const bi = makeBinayNumbers(numbers[i]);
        const L = bi.length;
        let H = 1;
        while ((2 ** H - 1) < L) H++;
        const size = 2 ** H - 1;
        const pad = size - L;

        const ok = isValidTree(bi, pad);
        answer.push(ok ? 1 : 0);
  }

  return answer;
}
