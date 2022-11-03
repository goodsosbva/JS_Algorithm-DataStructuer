function solution(arr) {
    var arr1 = [...arr];
    // sort는 기본적으로 유니코드 순으로 리턴하므로
    // sort를 정의 해주어야 한다.
    arr1.sort((a, b) => a - b);
    var MinVal = arr1[0];
    
    const answer = arr.filter(val => val !== MinVal);
    
    if (answer.length === 0) return [-1];
    return answer;
}
