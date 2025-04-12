function solution(coin, cards) {
    const total = cards.length;
    const n = total;
    
    const initCounts = n / 3;
    
    const initHand = new Array(n + 1).fill(0);
    for (let i = 0; i < initCounts; i++) {
        initHand[cards[i]]++;
    }
    
    const stIdx = initCounts;
    const memo = new Map();
    
    const pairs = [];
    for (let x = 1; x <= Math.floor(n / 2); x++) {
        let y = n + 1 - x;
        if (x < y) {
            pairs.push([x, y]);
        }
    }
    
    function handToKey(hand) {
        return hand.join(',');
    }
    
    function dfs(index, coinLeft, hand, round) {
        if (index > n - 2) {
            return round;
        }
        
        const key = index + '|' + coinLeft + '|' + handToKey(hand);
        if (memo.has(key)) {
            return memo.get(key);
        }
        
        let result = round;
        const card1 = cards[index];
        const card2 = cards[index + 1]
        
        const descision = [
            { buy1: false, buy2: false, coin: 0 },
            { buy1: true, buy2: false, coin: 1},
            { buy1: false, buy2: true, coin: 1},
            { buy1: true, buy2: true, coin: 2},
        ]
        
        for (const desc of descision) {
            if (coinLeft < desc.coin) {
                continue;
            }
            
            const newCoin = coinLeft - desc.coin;
            const newHand = hand.slice();
            
            if (desc.buy1) newHand[card1]++;
            if (desc.buy2) newHand[card2]++;
            
            let roundFair = false;
            
            for (let pair of pairs) {
                const [x, y] = pair;
                if (newHand[x] > 0 && newHand[y] > 0) {
                    roundFair = true;
                    newHand[x]--;
                    newHand[y]--;
                    
                    const ans = dfs(index + 2, newCoin, newHand, round + 1);
                    result = Math.max(result, ans);
                    
                    newHand[x]++;
                    newHand[y]++;
                }
            }
            
            if (!roundFair) {
                result = Math.max(result, round);
            }
        }
        memo.set(key, result)
        return result
    }
    
    return dfs(stIdx, coin, initHand, 1);
}
