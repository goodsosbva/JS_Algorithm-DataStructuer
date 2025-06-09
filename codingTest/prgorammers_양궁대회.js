function combinationsWithRepetition(arr, n) {
    if (n === 1) return arr.map((v) => [v]);
    
    const result = []; 
    arr.forEach((fixed, idx, arr) => {
        const rest = arr.slice(idx);
        const combis = combinationsWithRepetition(rest, n - 1);
        const combine = combis.map((v) => [fixed, ...v]);
        result.push(...combine);
    });
    
    return result;
}

function solution(n, info) {
    let maxdiff = 0;
    let maxComb = {};
    
    function caculateScore(combi) {
        let sc1 = 0;
        let sc2 = 0;
        for (let i = 0; i <= 10; i++) {
            const lionShots = combi.filter((x) => x === i).length;
            const apeachShots = info[10 - i];

            if (lionShots > apeachShots) {
                sc1 += (10 - i);
            } else if (apeachShots > 0) {
                sc2 += (10 - i);
            }
        }

        return [sc1, sc2];
    }
    
    function caculateDiff(diff, cnt) {
        if (diff > maxdiff) {
            maxComb = { ...cnt };
            maxdiff = diff;
        }
    }
    
    for (const combi of combinationsWithRepetition([...Array(11).keys()], n)) {
        const cnt = combi.reduce((acc, cur) => {
            acc[cur] = (acc[cur] || 0) + 1;
            return acc;
        }, {});
        
        const [sc1, sc2] = caculateScore(combi);
        const diff = sc1 - sc2;
        caculateDiff(diff, cnt);
    }
    
    if (maxdiff > 0) {
        const answer = Array(11).fill(0);
        for (const n of Object.keys(maxComb)) {
            answer[10 - n] = maxComb[n];
        }
        return answer;
    } else {
        return [-1];
    }
}
