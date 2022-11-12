function solution(babbling) {
    const wordSet = new Set(["aya", "ye", "woo", "ma"])
    let result = 0;

    for(const word of babbling) {
        let remainWord = '';
        let prevWord = '';
        for(const char of word) {
            remainWord += char;
            if(wordSet.has(remainWord)) {
                if(remainWord === prevWord) break;
                prevWord = remainWord
                remainWord = ''
            }
        }
        // remainWord가 비워지면 적어도 한 번은 옹알이를 쓴데 되니까
        // 또한 발음할 수 있는 옹알이만 쓰게 된것.
        // remainWord가 남게 되면 못쓴 단어가 있다고 판단되는 것
        if(remainWord === '') result++
    }
    return result;
}
