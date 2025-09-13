function solution(arr, n) {
    function rotate90(matrix) {
        const answer90 = Array.from(Array(arr.length), () => new Array(arr[0].length).fill(0));

        for (let i = 0; matrix.length > i; i++) {
            for (let j = 0; matrix[0].length > j; j++) {
                answer90[i][j] = matrix[arr.length -1 - j][i];
            }
        }

        return answer90;
    }

    let answer = arr;
    for (let i = 0; i < n; i++) {
        answer = rotate90(answer);
    }
    
    return answer;
}

arr = [[1,2,3,4],[5,6,7,8],[9,10.,11,12],[13,14,15,16]]
answer = solution(arr, 2);
console.log(answer)
