function changeNbase (num, base) {
    let result = [];
    while (num > 0) {
        result.push(num % base);
        num = Math.floor(num / base);
    }
    
    result = result.reverse().join("").split("0").filter(v => v !== "");;
    return result;
}

function isSosu(number) {
    if (number === 0) return false;
    if (number === 1) return false;
    if (number === 2) return true;
    if (number % 2 === 0) return false;
    
    const limit = Math.sqrt(number);
    for (let i = 3; i <= limit; i++) {
        if (number % i === 0) return false;
    }
    
    return true;
}

function solution(n, k) {
    var answer = 0;
    
    const kBase = changeNbase(n, k);
    
    for (let num of kBase) {
        if (isSosu(Number(num))) answer += 1;
    }
    return answer;
}
