function dfs(picks, minerals, idx, used, original_cnt, pick_cnt) {
    let have_stone = true;
    for (let i = idx; i < 5 + idx; i++) {
         let pick_fatigue = {"diamond": 3, "iron": 2, "stone": 1};
  
         const stone = minerals[i];
        
         if (stone === undefined) {
             have_stone = false;
             break;
         }
         
         const fatigue = pick_fatigue[used] - pick_fatigue[stone];

         if (fatigue >= 0) {
            original_cnt += 1;
         } else if (fatigue >= -1) {
            original_cnt += 5;
         } else {
            original_cnt += 25;
         }
    }
    
    if (!have_stone) return original_cnt;
    
    idx += 5;
    
    if (picks['diamond'] === 0 && picks['iron'] === 0 && picks['stone'] === 0) return original_cnt;
    if (idx >= minerals.length) return original_cnt;
    
    
    let new_picks1 = structuredClone(picks);
    let new_picks2 = structuredClone(picks);
    let new_picks3 = structuredClone(picks);
    
    let res = [];
    
    // 공괭이를 다쓰면 공괭이를 새로 고르는 작업
    let cnt1, cnt2, cnt3;
    if (new_picks1['diamond'] > 0) {
        new_picks1['diamond'] -= 1;
        res.push(dfs(new_picks1, minerals, idx, 'diamond', original_cnt, 5));
    }

    if (new_picks2['iron'] > 0) {
        new_picks2['iron'] -= 1;
        res.push(dfs(new_picks2, minerals, idx, 'iron', original_cnt, 5));
    }

    if (new_picks3['stone'] > 0) {
        new_picks3['stone'] -= 1;
        res.push(dfs(new_picks3, minerals, idx, 'stone', original_cnt, 5));
    }

    let cnt = Math.min(...res);

    return cnt;
}


function solution(picks, minerals) {
    var answer = 0;
    let pick_dic = {};
    
    pick_dic['diamond'] = picks[0];
    pick_dic['iron'] = picks[1];
    pick_dic['stone'] = picks[2];
    
    let first_dia = structuredClone(pick_dic);
    let first_iron = structuredClone(pick_dic);
    let first_stone = structuredClone(pick_dic);
    
    let anss = [];
    
    first_dia['diamond'] -= 1;
    first_iron['iron'] -= 1;
    first_stone['stone'] -= 1;
    
    if (first_dia['diamond'] >= 0) anss.push(dfs(first_dia, minerals, 0, 'diamond', 0, 5));
    if (first_iron['iron'] >= 0) anss.push(dfs(first_iron, minerals, 0, 'iron', 0, 5));
    if (first_stone['stone'] >= 0) anss.push(dfs(first_stone, minerals, 0, 'stone', 0, 5));
        
    answer = Math.min(...anss);
    return answer;
}
