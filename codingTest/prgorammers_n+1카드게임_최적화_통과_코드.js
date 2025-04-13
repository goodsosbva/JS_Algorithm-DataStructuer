function solution(coin, cards) {
    const n = cards.length;
    let staIdx = n / 3;
    const target = n + 1;
    
    let round = 1;
    const myCards = new Set(cards.slice(0, staIdx));
    const possibleCards = new Set();
    
    while (staIdx < n) {
        if (staIdx >= n) {
            break;
        }
        
        const c1 = cards[staIdx];
        const c2 = cards[staIdx + 1];
        possibleCards.add(c1);
        possibleCards.add(c2);
        staIdx += 2;
        
        let pNext = false;
        for (const c of myCards) {
            const y = target - c;
            if (myCards.has(y)) {
                pNext = true;
                myCards.delete(c);
                myCards.delete(y);
                break;
            }
        }
        
        if (pNext) {
            round += 1;
            continue;
        }
        
        if (coin >= 1) {
            for (const c of myCards) {
                const y = target - c;
                if (possibleCards.has(y)) {
                    pNext = true;
                    myCards.delete(c);
                    possibleCards.delete(y);
                    break;
                }
        }
        
        if (pNext) {
                round += 1;
                coin -= 1;
                continue;
            }
        }
      
        
        if (coin >= 2) {
            for (const c of possibleCards) {
                const y = target - c;
                if (possibleCards.has(y)) {
                    pNext = true;
                    possibleCards.delete(c);
                    possibleCards.delete(y);
                    break;
                }
        }
        
        if (pNext) {
                round += 1;
                coin -= 2;
                continue;
            } 
        }
      
        
        if (!pNext) {
            break;
        }
    }
    
    return round;
}
