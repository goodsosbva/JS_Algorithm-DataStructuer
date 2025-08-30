function solution(arr) {
    const counts = Array(26).fill(0);

    for (const c of arr) {
        counts[c.charCodeAt(0) - 'a'.charCodeAt(0)] += 1;
    }

    let answer = "";
    for (let i = 0; i < 26; i++) {
        answer += String.fromCharCode(i + 'a'.charCodeAt(0)).repeat(counts[i]);
    }

    return answer;
}


answer = solution("hello");
console.log(answer);
