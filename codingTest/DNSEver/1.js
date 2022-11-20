function solution(friends, user_id) {
    var answer = [];
    var relation = {};

    for (let i = 0; i < friends.length; i++) {
        if (relation[friends[i][0]] === undefined || relation[friends[i][1]] === undefined) {
            // console.log(friends[i], relation)
            if (relation[friends[i][0]] === undefined) {
                relation[friends[i][0]] = [friends[i][1]];
            }
            else {
                relation[friends[i][0]].push(friends[i][1])
            }
            if (relation[friends[i][1]] === undefined) {
                relation[friends[i][1]] = [friends[i][0]];
            }
            else {
                relation[friends[i][1]].push(friends[i][0])
            }
        
        }
        else {
            // console.log("else")
            relation[friends[i][0]].push(friends[i][1]);
            relation[friends[i][1]].push(friends[i][0]);
        }
    }

    var result = [];
    var search = [user_id]
    for (f1 of search) {
        for (f2 in relation) {
            if (f1 === f2) continue;
            let intersection = relation[f1].filter(x => relation[f2].includes(x))
            if (intersection.length !== 0) {
                result.push([f2, intersection.length])
            }
        }
    }

    result.sort((a, b) => b[1] - a[1]);
    var maxValue = result[0][1];
    
    for (let i = 0; i < result.length; i++) {
        if (maxValue === result[i][1]) {
            answer.push(result[i][0])
        }
    }

    return answer;
}

// 입력값 〉
// [["david", "demi"], ["frank", "demi"], ["demi", "james"]], "frank"
// 기댓값 〉
// ["david", "james"]