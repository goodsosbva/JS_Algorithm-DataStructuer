function solution(s) {
    var answer = [];
    
    const spiced_s = s.slice(2, s.length - 2)
    console.log(spiced_s)
    const spliced_ss = spiced_s.split("},{");
    console.log(spliced_ss)
    const sorted_ss = spliced_ss.sort((a, b) => {
        return a - b;
    })
    console.log('sorted_ss')
    return answer;
}
