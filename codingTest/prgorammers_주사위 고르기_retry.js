function getCombi(dice, k) {
    const res = [];
    
    function helper(start, combi) {
        if (combi.length === k) {
            res.push([...combi]);
            return;
        }
        
        for (let i = start; i < dice.length; i++) {
            combi.push(dice[i]);
            helper(i + 1, combi);
            combi.pop();
        }
    }
    helper(0, []);
    
    return res;
}

function makeConvolSum(dice, idxs) {
    let dic = {0: 1};
    
    for (let idx of idxs) {
        const newDic = {};
        
        for (const sum in dic) {
            for (let number of dice[idx]) {
                const newSum = Number(sum) + number;
                newDic[newSum] = (newDic[newSum] || 0) + dic[sum]; 
            }
        }
        
        dic = newDic;
    }
    
    return dic;
}

function caculWin(ourSum, otherSum) {
    let winCount = 0;
    for (let ourS in ourSum) {
        const s1 = Number(ourS);
        const c1 = ourSum[ourS];
        for (let otherS in otherSum) {
            const s2 = Number(otherS);
            const c2 = otherSum[otherS];
            
            if (s1 > s2) {
                winCount += c1 * c2;
            }
        }
    }
    return winCount;
}

function solution(dice) {
    const n = dice.length;
    const k = n / 2;
    const indices = dice.map((_, index) => index);
    
    const ourDiceIdx = getCombi(indices, k);
    
    let winerIdx = [];
    let maxSum = 0;
    
    for (let i = 0; i < ourDiceIdx.length; i++) {
        let otherDiceIdx = [];
        
        for (let j = 0; j < dice.length; j++) {
            if (!ourDiceIdx[i].includes(j)) {
                otherDiceIdx.push(j);
            }
        }
        
        const ourSum = makeConvolSum(dice, ourDiceIdx[i]);
        const otherSum = makeConvolSum(dice, otherDiceIdx);
        
        const winCount = caculWin(ourSum, otherSum)
        
        if (maxSum < winCount) {
            maxSum = winCount;
            winerIdx = ourDiceIdx[i];
        }
    }
    
    for (let i = 0; i < winerIdx.length; i++) {
        winerIdx[i] += 1;
    }
    answer = winerIdx;
    return answer;
}
