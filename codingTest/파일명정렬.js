
function solution(files) {
    var answer = [];
    
    var ans = [];
    for (let i = 0; i < files.length; i++) {
        var chkedNumber = false;
        var tmpNumber = "";
        var tmpHEAD = "";
        var a = [];
        for (let j = 0; j < files[i].length; j++) {
            if (isNaN(files[i][j]) && !chkedNumber) {
                tmpHEAD += (files[i][j])
                continue;
            }
            if (isNaN(files[i][j]) === false && files[i][j] !== " " && tmpNumber.length < 5) {
                tmpNumber += (Number(files[i][j]))
                chkedNumber = true;
                continue;
            }
            if ((isNaN(files[i][j]) && chkedNumber) || tmpNumber.length >= 5) {
                a.push(files[i]);
                a.push(Number(tmpNumber));
                a.push(i)
                a.push(tmpHEAD.toLowerCase());
                ans.push(a);
                break
            }
        }
    }
    
    // arr.sort((prev, cur) => {  // 1번째 요소 오름차순 -> 2번째 요소 오름차순
    //   if (prev[0] > cur[0]) return 1;
    //   if (prev[0] < cur[0]) return -1;
    //   if (prev[1] > cur[1]) return 1;
    //   if (prev[1] < cur[1]) return -1;
    // });
    // console.log(ans);
    ans.sort((prev, cur) => {  // 2번째 배열 요소를 기준으로 오름차순
        if (prev[3] > cur[3]) return 1;
        if (prev[3] < cur[3]) return -1;
       
        if (prev[1] > cur[1]) return 1;
        if (prev[1] < cur[1]) return -1;
          
        return 0;
        // if (prev[2] > cur[2]) return 1;
        // if (prev[2] < cur[2]) return -1;
        
        
        
    });
    // console.log(ans);
    
    for (let k = 0; k < ans.length; k++) {
        answer.push(ans[k][0]);
    }

    return answer;
}


function solution(files) {
    var answer = [];
    var tmp = [];
    
    for (let i = 0; i < files.length; i++) {
        const HeadStr = files[i].match(/^\D+/)[0].toLowerCase();
        const Num = Number(files[i].match(/\d+/)[0].replace(/^0+/, ''));
        
        console.log(files[i]);
        tmp.push([files[i], HeadStr, Num, i])
    }
    // console.log(tmp);
    
    tmp.sort((prev, cur) => {  // 2번째 배열 요소를 기준으로 오름차순
        if (prev[1] > cur[1]) return 1;
        if (prev[1] < cur[1]) return -1;
       
        if (prev[2] > cur[2]) return 1;
        if (prev[2] < cur[2]) return -1;
          
        if (prev[3] > cur[3]) return 1;
        if (prev[3] < cur[3]) return -1;
        
    });
    
    // console.log(tmp)
    
    for (let k = 0; k < tmp.length; k++) {
        answer.push(tmp[k][0]);
    }
    
    return answer;
  }
  

  