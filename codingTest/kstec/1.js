function solution(office, k) {
    var answer = -1;
    
    for (let i = 0; i < office.length; i++) {
        for (let j = 0; j < office.length; j++) {
            var cnt = 0;
            if (i + k > office.length || j + k > office.length) {
                break;
            } 
            for (let x = 0; x < k; x++) {
                for (let y = 0; y < k; y++) {
                    if (office[i + x][j + y] === 1) {
                        cnt++;
                    }
                }
        
            }
            answer = Math.max(answer, cnt);
        }
    }
    
  return answer;
}