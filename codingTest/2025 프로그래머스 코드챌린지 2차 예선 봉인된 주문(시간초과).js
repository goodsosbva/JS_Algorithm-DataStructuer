function check_ban_lang(lang, bans) {
    for (let i = 0; i < bans.length; i++) {
        if (bans[i] === lang) return true;
    }
    return false;
}


function next_prev(prev, dics) {
    let arr = prev.split('');
    let i = arr.length - 1;

    while (i >= 0) {
        if (arr[i] === 'z') {
            arr[i] = 'a';  
            i--;
        } else {
            arr[i] = dics[dics.indexOf(arr[i]) + 1];
            return arr.join('');
        }
    }
    
    return 'a' + arr.join(''); 
}


function solution(n, bans) {
    const dics = [
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
      'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
      's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    ];

    let count = 0;
    let idx = 0;
    let prev = "";

    while (true) {
        let cur = dics[idx];
        let lang = prev + cur;

        let is_have = check_ban_lang(lang, bans);

        if (is_have) idx += 1;
        else {
            idx += 1;
            count += 1;
        }

        if (count === n) return lang;

        if (idx === 26) {
            idx = 0;
            prev = next_prev(prev, dics);
        }
    }
}
