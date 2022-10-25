
function solution1(land) {
  var candidate = [];

  for (let st = 0; st < 4; st++) {
    var summary = land[0][st];
    var idx = st;
    for (let i = 1; i < land.length; i++) {
      var tmp = land[i].slice();
      tmp.splice(idx, 1);
      // console.log(st, tmp, land[i], Math.max(...tmp));
      var maxval = Math.max(...tmp);
      idx = land[i].indexOf(maxval);
      // console.log(tmp, land[i], maxval, idx);
      summary += maxval;
    }
    candidate.push(summary);
  }

  // console.log(candidate)
  answer = Math.max(...candidate);
  return answer;
}

function solution2(land) {
  for (let i = 1; i < land.length; i++) {
    const previousRow = land[i - 1];
    const previousMax = Math.max(...previousRow);
    const previousColumn = previousRow.indexOf(previousMax);
    const currentRow = land[i];
    for (let currentColumn = 0; currentColumn < currentRow.length; currentColumn++) {
        if (currentColumn === previousColumn) {
            // 기억 해둬야할 전처리 과정
            const sliced = [
            ...previousRow.slice(0, previousColumn),
            ...previousRow.slice(previousColumn + 1),
            ];
            console.log(sliced);
            currentRow[currentColumn] += Math.max(...sliced);
            continue;
        }
      currentRow[currentColumn] += previousMax;
    }
  }
//   console.log(land);
  return Math.max(...land[land.length - 1]);
}


function solution(land) {
    var answer = 0;
    
    for (let i = 1; i < land.length; i++) {
        var prevMax = Math.max(...land[i - 1]);
        var prevIdx = land[i - 1].indexOf(prevMax);
        // var curMax = Math.max(...land[i]);
        // var curIdx = land[i].indexOf(curMax);
        for (let j = 0; j < land[0].length; j++) {
            if (j === prevIdx) {
                const s = [
                    ...land[i - 1].slice(0, prevIdx),
                    ...land[i - 1].slice(prevIdx + 1)
                ]
                land[i][j] += Math.max(...s);
                continue;
            }
            land[i][j] += Math.max(...land[i - 1])
        }
        // console.log(land)
    }
    // console.log(land);
    answer = Math.max(...land[land.length - 1])
    return answer;
}


console.log(solution([[1, 2, 3, 5], [5, 6, 7, 8], [4, 3, 2, 1]]))