 const getPermutations = function (arr, selectNumber) {
    const results = [];
    if (selectNumber === 1) return arr.map((el) => [el]); 
    // n개중에서 1개 선택할 때(nP1), 바로 모든 배열의 원소 return. 1개선택이므로 순서가 의미없음.

    arr.forEach((fixed, index, origin) => {
      const rest = [...origin.slice(0, index), ...origin.slice(index+1)] 
      // 해당하는 fixed를 제외한 나머지 배열 
      const permutations = getPermutations(rest, selectNumber - 1); 
      // 나머지에 대해서 순열을 구한다.
      const attached = permutations.map((el) => [fixed, ...el]); 
      //  돌아온 순열에 떼 놓은(fixed) 값 붙이기
      results.push(...attached); 
      // 배열 spread syntax 로 모두다 push
    });

    return results; // 결과 담긴 results return
}

function solution(babbling) {
    var answer = 0;
    
    var dic = {};
    var bable = ["aya", "ye", "woo", "ma"]
    for (let i = 0; i < bable.length; i++) {
        dic[bable[i]] = false;
    }
    
    var babls = getPermutations(bable, 2);
    var babls1 = getPermutations(bable, 3);
    var babls2 = getPermutations(bable, 4);
    for (let i = 0; i < babls.length; i++) {
        dic[babls[i][0] + babls[i][1]] = false
    }
    for (let i = 0; i < babls1.length; i++) {
        dic[babls1[i][0] + babls1[i][1] + babls1[i][2]] = false
    }
    for (let i = 0; i < babls2.length; i++) {
        dic[babls2[i][0] + babls2[i][1] + babls2[i][2] + babls2[i][3]] = false
    }
    
    for (let i = 0; i < babbling.length; i++) {
        if (dic[babbling[i]] === false) {
            dic[babbling[i]] = true;
        }
    }
    // console.log(dic);
    var candi = [];
    
    for (d in dic) {
        if (dic[d] === true) {
            answer++;
            // console.log(d)
            // candi.push(d)
        }
    }
    
//     console.log(candi);
//     var chk = {"aya": 0, "ye": 0, "woo": 0, "ma": 0}
    
//     for (let k = 0; k < candi.length; k++) {
//         if ()
//     }
    return answer;
}


// 다른 풀이
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
