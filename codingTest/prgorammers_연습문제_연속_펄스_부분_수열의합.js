function maxSubarray(arr) {
  if (arr.length === 0) return { maxSum: 0, start: -1, end: -1 };

  let currentSum = arr[0];
  let maxSum = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > currentSum + arr[i]) {
      currentSum = arr[i];
    } else {
      currentSum += arr[i];
    }

    if (currentSum > maxSum) {
      maxSum = currentSum;
    }
  }

  return maxSum
}

function solution(sequence) {
    var answer = 0;
    
    const n = sequence.length;
    let seq1 = [];
    let seq2 = [];
    for (let t = 0; t < 2; t++) {
        let purse1 = 1;
        let pusee2 = -1;
        for (let i = 0; i < n; i++) {
            if (t === 0) {
                const newArrItem = sequence[i] * purse1;
                seq1.push(newArrItem);
                purse1 *= -1;
            } else {
                const newArrItem = sequence[i] * pusee2;
                seq2.push(newArrItem);
                pusee2 *= -1;
            }
        }
    }
    
    const ans1 = maxSubarray(seq1);
    const ans2 = maxSubarray(seq2);
    
    answer = Math.max(ans1, ans2);
   
    return answer;
}
