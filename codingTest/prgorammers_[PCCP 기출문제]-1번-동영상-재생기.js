function caulateTime(times, operator) {
    let time = times.split(":");
    let minu = Number(time[0]);
    let sec = Number(time[1]);
    const targetSec = 10; 
    
    if (operator === '+') {
        let plusedSec = sec + targetSec;
        if (plusedSec > 60) {
            plusedSec = plusedSec % 60;
            minu += 1;
        }
        
        return String(minu) + ":" + String(plusedSec);
    } else {
        let minusedSec = sec - targetSec;
        if (minusedSec  < 0) {
            if (minu == 0) return "00:00";
            
            minusedSec += 60;  
            minu -= 1;
        }
        
        return String(minu) + ":" + String(minusedSec); 
    }
}

function chkVideoLen(videoLength, curTime) {
    const [videoMin, videoSec] = videoLength.split(":").map(Number);
    const [curMin, curSec] = curTime.split(":").map(Number);
    
    if (curMin > videoMin) return true;
    
    else if (curMin === videoMin) {
        if (curSec > videoSec) return true
        else {
            return false;
        }
    } else return false;
}

function toSeconds(time) {
  const [m, s] = time.split(':').map(Number);
  return m * 60 + s;
}

function canSkipOpening(curTime, opStart, opEnd) {
    const cur = toSeconds(curTime);
    const start = toSeconds(opStart);
    const end = toSeconds(opEnd);
    
    if (cur >= start && cur <= end) return true;
    
    return false;
}

function solution(video_len, pos, op_start, op_end, commands) {
    var answer = '';

    let curTime = pos;
    for (let i = 0; i < commands.length; i++) {
        if (canSkipOpening(curTime, op_start, op_end)) {
            curTime = op_end;
        }
            
        if (commands[i] === 'next') {
            curTime = caulateTime(curTime, '+');
            
            if (chkVideoLen(video_len, curTime)) {
                curTime = video_len;
            }
        } else {
            curTime = caulateTime(curTime, '-');
            
             if (chkVideoLen(video_len, curTime)) {
                curTime = "00:00";
            }
        }
        
        if (canSkipOpening(curTime, op_start, op_end)) {
            curTime = op_end;
        }
    }
    
    let [curMin, curSec] = curTime.split(":").map(Number);
    
    if (curMin < 10) {
        curMin = "0" + String(curMin);
    } 

    if (curSec < 10) {
        curSec = "0" + String(curSec);
    }
    
    answer = curMin + ":" + curSec;
    return answer;
}
