function solution(friends, gifts) {
    const n = friends.length;

    const friendIndex = {};
    for (let i = 0; i < n; i++) {
      friendIndex[friends[i]] = i;
    }

    const given = Array(n).fill(0);
    const received = Array(n).fill(0);

    const matrix = Array.from({ length: n }, () => Array(n).fill(0));
    
    for (let i = 0; i < gifts.length; i++) {
        const [giver, receiver] = gifts[i].split(" ");
        const giverIndex = friendIndex[giver];
        const receiverIndex = friendIndex[receiver];
        
        given[giverIndex]++;
        received[receiverIndex]++;
        matrix[giverIndex][receiverIndex]++;
    }
    
    const giftIndex = given.map((g, i) => g - received[i]);
  
    const answer = Array(n).fill(0);
    
    for (let i = 0; i < friends.length; i++) {
        for (let j = i + 1; j < friends.length; j++) {
            const atob = matrix[i][j];
            const btoa = matrix[j][i];
            
            if (atob || btoa) {
                if (atob > btoa) {
                    answer[i]++;
                } else if (atob < btoa) {
                    answer[j]++;
                } else {
                    if (giftIndex[i] > giftIndex[j]) {
                        answer[i]++;
                    } else if (giftIndex[i] < giftIndex[j]) {
                        answer[j]++;
                    }
                }
            } else {
                if (giftIndex[i] > giftIndex[j]) {
                        answer[i]++;
                    } else if (giftIndex[i] < giftIndex[j]) {
                        answer[j]++;
                    }
            }
        }
    } 
    return Math.max(...answer);
}
