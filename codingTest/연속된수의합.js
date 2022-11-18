function solution(num, total) {
    let startNum = 0
    // 초반 [0~num]의 배열을 생성 + 그합
    let twoPointer = new Array(num).fill(0).map((a, i) => i).reduce((a, b) => a + b, 0)
    // 배열이 total과 같아질 때까지 반복
    while(twoPointer !== total) {
        // 현재 배열의 합이 total보다 작으면 +1
        if(twoPointer < total) {
            startNum++
        // 크면 -1
        } else {
            startNum--
        }
        // 변경된 startNum에 따른 배열의 합 계산
        twoPointer = new Array(num).fill(0).map((a,i) => i + startNum).reduce((a,b) => a + b, 0)
    }
    return new Array(num).fill(0).map((a,i) => i + startNum)
}

console.log(solution(3, 12))