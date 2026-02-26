function ranking(number) {
    if (number === 6) return 1;
    else if (number === 5) return 2;
    else if (number === 4) return 3;
    else if (number === 3) return 4;
    else if (number === 2) return 5;
    else return 6;
}

function solution(lottos, win_nums) {
    var answer = [];
    
    const wins = new Set(win_nums);
    let best =  0;
    let lowest = 0;
    for (let i = 0; i < lottos.length; i++) {
        if (wins.has(lottos[i])) lowest++;
        if (wins.has(lottos[i]) || lottos[i] === 0) best++;
    }
    return [ranking(best), ranking(lowest)];
}
