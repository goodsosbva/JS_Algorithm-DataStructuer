function getCombinations(arr, k) {
    const res = [];
    function helper(start, comb) {
        if (comb.length === k) {
            res.push([...comb]);
            return;
        }
        
        for (let i = start; i < arr.length; i++) {
            comb.push(arr[i]);
            helper(i + 1, comb);
            comb.pop();
        }
    }
    helper(0, []);
    return res;
}

function makeConvolutionSum(dice, cdice) {
    let summaryDic = { 0: 1 };
    
    for (const idx of cdice) {
        const newSummaryDic = {};
        for (const sum in summaryDic) {
            for (const number of dice[idx]) {
                const newSum = Number(sum) + number;
                newSummaryDic[newSum] = (newSummaryDic[newSum] || 0) + summaryDic[sum];
            } 
        }
            
        summaryDic = newSummaryDic;
    }
    
    return summaryDic;
}

function countWins(ourSum, otherSum) {
    let winCount = 0;
    for (const s in ourSum) {
        const sumA = Number(s);
        const countA = ourSum[s];
        for (const t in otherSum) {
            const sumB = Number(t);
            const countB = otherSum[t];
            if (sumB < sumA) {
                winCount += countA * countB;
            }
        }
    }
    return winCount;
}

function solution(dice) {
    const n = dice.length;
    const k = n / 2;
    const indices = dice.map((_, index) => index);
    const ourDice = getCombinations(indices, k);
    
    let winerIdx = [];
    let maxSum = 0;
    
    for (let i = 0; i < ourDice.length; i++) {
        let otherDice = [];
        
        for (let j = 0; j < dice.length; j++) {
            if (!ourDice[i].includes(j)) {
                otherDice.push(j);
            }
        }
        
        const ourSum = makeConvolutionSum(dice, ourDice[i]);
        const otherSum = makeConvolutionSum(dice, otherDice);
        
        const winCount = countWins(ourSum, otherSum);
        
        if (winCount > maxSum) {
            winerIdx = ourDice[i];
            maxSum = winCount;
        }
    }
    
    for (let i = 0; i < winerIdx.length; i++) {
        winerIdx[i] += 1;
    }
    answer = winerIdx;
    return answer;
}
