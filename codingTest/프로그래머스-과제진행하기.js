function solution(plans) {
    var answer = [];
    let new_start = [];
    let tmp_stop = [];
    let cur = [];
    
    let plans_ = [];
    for (let i = 0; i < plans.length; i++) {
        const [lang, start, time] = plans[i];
        
        const [h, m] = start.split(':').map(Number);
        const s_time = h * 60 + m;
        
        plans_.push([lang, s_time, Number(time)]);
    }
    
    plans_.sort((a, b) => {
        return a[1] - b[1];
    });
    for (const plan of plans_) {
        
        if (cur.length === 0) {
            cur.push(plan)
            continue;
        }
        
        const [c_lang, c_stime, c_ptime] = cur[cur.length - 1];
        const [p_lang, p_stime, p_ptime] = plan;
        
        let spare = p_stime - (c_stime + c_ptime);
        if (spare >= 0) {
            const current = cur.pop();

            cur.push(plan)
            answer.push(current[0]);
            while (tmp_stop.length !== 0) {
                let [t_lang, t_time] = tmp_stop[tmp_stop.length - 1];

                if (spare >= t_time) {
                    tmp_stop.pop();
                    answer.push(t_lang);
                    spare -= t_time;
                } else {
                    t_time -= spare;
                    const new_t_time = t_time;

                    tmp_stop.pop();
                    tmp_stop.push([t_lang, new_t_time]);
                    break;
                }

                if (spare === 0) break;
            }
        } else if (p_stime < c_stime + c_ptime) {
            const remain = p_stime - c_stime;
            cur.pop();
            
            tmp_stop.push([c_lang, c_ptime - remain]);
            cur.push(plan);
        }
    }
    
    while (cur.length !== 0) {
        const current = cur.pop();
        answer.push(current[0]);
    }
    
    while (tmp_stop.length !== 0) {
        const tmp = tmp_stop.pop();
        answer.push(tmp[0])
    }
    
    return answer;
}
