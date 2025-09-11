function solution(s) {
    var ans = [];
    
    const spiced_s = s.slice(2, s.length - 2)
    const spliced_ss = spiced_s.split("},{");
    
    const ss = [];
    for (let i = 0; i < spliced_ss.length; i++) {
        const s = spliced_ss[i].split(",")
        ss.push(s)
    }
    const sorted_ss = ss.sort((a, b) => {
        return a.length - b.length;
    })
    
    for (let i = 0; i < sorted_ss.length; i++) {
        for (let j = 0; j < sorted_ss[i].length; j++) {
            if (!ans.includes(sorted_ss[i][j])) {
                ans.push(sorted_ss[i][j]);
            }
        }
    }
    
    const answer = ans.map((a) => Number(a));
    return answer;
}
