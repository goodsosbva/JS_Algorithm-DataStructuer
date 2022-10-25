function solution0(m, musicinfos) {
    var answer = '';
    var res = {};
    
    for (let i = 0; i < musicinfos.length; i++) {
        var data = musicinfos[i].split(",");
        
        var stTime = data[0].split(":")
        var endTtime = data[1].split(":");
        
        var start = stTime[0] * 60 + stTime[1];
        var end = endTtime[0] * 60 + endTtime[1];
        
        var idx = end - start;
        
        // console.log(data, stTime, end, start, idx);
        
        var newData = ""
        var oldData = data[3];
        var tit = data[2];
        var index = 0;
        var breakIdx = 0;
        if (idx > oldData.length) {
            while(true) {
                if (breakIdx >= idx) {
                    break;
                }
                // console.log(index % oldData.length)
                if (oldData[(index) + 1] === "#") {
                    newData += oldData[index % oldData.length];
                    index += 1;
                    continue;
                }
                newData += oldData[index % oldData.length]
                index += 1;
                breakIdx += 1;
                
                if (m.length <= newData.length) {
                  let textIdx = newData.lastIndexOf(m);
                  // console.log(textIdx, m.length, newData[textIdx + m.length], res);
                  if (textIdx !== -1 && newData[textIdx + m.length] !== "#" && newData[textIdx + m.length] !== undefined)
                    res[tit] = idx;
                }
            }
        }
        else {
            newData = oldData;
            if (m.length <= newData.length) {
                  let textIdx = newData.lastIndexOf(m);
                  // console.log(textIdx, m.length, newData[textIdx + m.length], res);
                  if (textIdx !== -1 && newData[textIdx + m.length] !== "#" && newData[textIdx + m.length] !== undefined)
                    res[tit] = idx;
                }
        }
        // console.log(newData);
        // console.log(res);
    }
    const longtime = Math.max.apply(null, Object.values(res));

    if (!Object.keys(res).length) return "(None)";
    return Object.keys(res).find((key) => res[key] === longtime);
}

function solution(m, musicinfos) {
    const result = {};
    let timeout = 0;
    let text = "";
    for (let music of musicinfos) {
      text = "";
      let time = 0;
      let [stTime, endTime, title, context] = music.split(",");
      let [stHour, stMin] = stTime.split(":");
      let [endHour, endMin] = endTime.split(":");
      timeout = (endHour - stHour) * 60 + (endMin - stMin);
  
      let words = context.split("");
      while (timeout >= time) {
        for (let idx in words) {
          if (time > timeout) break;
          if (words[Number(idx) + 1] === "#") {
            text += words[idx];
            continue;
          }
  
          text += words[idx];
          ++time;
  
          if (m.length <= text.length) {
            let textIdx = text.lastIndexOf(m);
            if (textIdx !== -1 && text[textIdx + m.length] !== "#")
              result[title] = timeout;
          }
        }
      }
    }
    const longtime = Math.max.apply(null, Object.values(result));
  
    if (!Object.keys(result).length) return "(None)";
    return Object.keys(result).find((key) => result[key] === longtime);
  }