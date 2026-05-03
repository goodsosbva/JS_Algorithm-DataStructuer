function makeCounselorCases(n, k) {
  const result = [];

  function dfs(type, remain, selected) {
    if (type === k) {
      selected.push(remain);
      result.push([...selected]);
      selected.pop();
      return;
    }

    for (let count = 1; count <= remain - (k - type); count++) {
      selected.push(count);
      dfs(type + 1, remain - count, selected);
      selected.pop();
    }
  }

  dfs(1, n, []);
  return result;
}

function solution(k, n, reqs) {
    var answer = 9999999;
    
    const possibles = makeCounselorCases(n, k);
    reqs.sort((a, b) => {return a[0] - b[0]});
    
    for (const possible of possibles) {
        // possible = [1, 2, 2]
        let timeTables = [];
        for (let i = 0; i < possible.length; i++) {
            let num = possible[i];
            let tmp = [];
            for (let j = 0; j < num; j++) {
                tmp.push(0);
            }
            timeTables.push(tmp);
        }
        const copiedReqs = [...reqs];
        let wait = 0;
        
        for (let req of copiedReqs) {
            let [startTime, duration, category] = req;
            
            const typeIndex = category - 1;
            const times = timeTables[typeIndex];

            let minIdx = 0;

            for (let a = 1; a < times.length; a++) {
                if (times[a] < times[minIdx]) {
                    minIdx = a;
                }
            }
            
            if (startTime >= times[minIdx]) {
                times[minIdx] = startTime + duration;
            } else {
                wait += times[minIdx] - startTime;
                times[minIdx] = times[minIdx] + duration;
            }
        }
                    
        answer = Math.min(answer, wait);
    }
    return answer;
}
