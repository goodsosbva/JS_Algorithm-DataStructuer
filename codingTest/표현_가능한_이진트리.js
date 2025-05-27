function makeBinayNumbers(number) {
  const binary = [];
  while (number > 0) {
    binary.push(number % 2);
    number = Math.floor(number / 2);
  }
  return binary.reverse();
}

// 주어진 이진 배열과 pad 값으로 재귀 검사
function isValidTree(arr, pad, s = 0, e = arr.length + pad - 1) {
  if (s > e) return true;
  const m = Math.floor((s + e) / 2);

  // m 위치의 비트 (원본 범위 안이면 arr, 아니면 0)
  const idx = m - pad;
  const bit = (idx >= 0 && idx < arr.length) ? arr[idx] : 0;

  // bit가 0인데, 그 구간에 arr 쪽에서 1이 하나라도 있으면 invalid
  if (bit === 0) {
    for (let i = 0; i < arr.length; i++) {
      const pos = pad + i;
      if (pos >= s && pos <= e && arr[i] === 1) {
        return false;
      }
    }
  }

  return isValidTree(arr, pad, s, m - 1) &&
         isValidTree(arr, pad, m + 1, e);
}

function solution(numbers) {
  const answer = [];

  for (let i = 0; i < numbers.length; i++) {
    const bi = makeBinayNumbers(numbers[i]);
    const L = bi.length;

    // 최소 H 구하기
    let H = 1;
    while ((2 ** H - 1) < L) H++;
    const size = 2 ** H - 1;
    const pad = size - L;

    // 재귀 검사
    const ok = isValidTree(bi, pad);
    answer.push(ok ? 1 : 0);
  }

  return answer;
}
