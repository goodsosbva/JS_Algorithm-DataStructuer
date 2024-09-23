function solution(enroll, referral, seller, amount) {
    var answer = [];
    
    let parent = {};
    for (let i = 0; i < enroll.length; i++) {
        parent[enroll[i]] = referral[i];
    }
    
    let total = {};
    for (let i = 0; i < enroll.length; i++) {
        total[enroll[i]] = 0;
    }
    
    for (let i = 0; i < seller.length; i++) {   
        let money = amount[i] * 100
        let curHuman = seller[i];
        while(money > 0 && curHuman != '-') {
            total[curHuman] += money - Math.floor(money / 10);
            
            curHuman = parent[curHuman];
            money = Math.floor(money / 10)
            
        }
    }
    
    for (const name in total) {
        answer.push(total[name])
    }
    
    return answer;
}