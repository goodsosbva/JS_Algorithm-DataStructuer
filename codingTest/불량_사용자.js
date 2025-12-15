function check(users, banned_id) {
    for (let i = 0; i < banned_id.length; i++) {
        if (banned_id[i].length !== users[i].length) return false;
        
        for (let j = 0; j < users[i].length; j++) {
            if (banned_id[i][j] === '*') continue;
            
            if (banned_id[i][j] !== users[i][j]) return false;
        }
    }
    
    return true;
}

function getPermutations(array, pickCount) {
  const result = [];

  function permute(current, remaining) {
    if (current.length === pickCount) {
      result.push(current);
      return;
    }

    for (let i = 0; i < remaining.length; i++) {
      const next = remaining[i];
      const rest = remaining.slice(0, i).concat(remaining.slice(i + 1));
      permute([...current, next], rest);
    }
  }

  permute([], array);
  return result;
}

function solution(user_id, banned_id) {
    var answer = 0;
    const permu_user_ids = getPermutations(user_id, banned_id.length);
    const possible_ids = new Set();
    
    for (const user of permu_user_ids) {
        if (!check(user, banned_id)) continue;
        
        const key = [...user].sort().join(',');
        possible_ids.add(key);
    }
    
    return possible_ids.size;
}
