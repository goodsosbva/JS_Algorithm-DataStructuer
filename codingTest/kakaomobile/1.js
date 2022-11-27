function solution(flowers) {
    var answer = 0;

    var max = Math.max(...flowers.flat())
    var dp = new Array(); 
	
    for(var i = 0; i < max; i++) { 
        dp[i] = 0;
    }

    for (let i = 0; i < flowers.length; i++) {
        for (let j = flowers[i][0]; j < flowers[i][1]; j++) {
            dp[j]++;
        }
    }

    for (let k = 0; k < dp.length; k++) {
        if (dp[k] > 0) answer++;
    }
    return answer;
}

// 입력값 〉
// [[2, 5], [3, 7], [10, 11]]
// 기댓값 〉
// 6
// 실행 결과 〉
// 테스트를 통과하였습니다.