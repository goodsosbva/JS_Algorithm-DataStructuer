function solution(sentence){
    var answer = ""

    var dic = {}
    var cnt = 26;
    for (let i = 97; i < 97 + cnt; i++) {
        dic[String.fromCharCode(i)] = 0;
    }

    sentence = sentence.toLowerCase();
    for (let s = 0; s < sentence.length; s++) {
        if (dic[sentence[s]] === 0) {
            dic[sentence[s]] = 1
        }
    }

    for (var key in dic) {
        if (dic[key] === 0) {
            answer += key
        }
    }

    if (answer.length === 0) return "perfect"
    return answer
}