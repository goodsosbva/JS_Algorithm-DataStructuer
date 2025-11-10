function solution(amount) {
    const coins = [1, 10, 50, 100];

    const ans = [];
    const sortedCoins = coins.sort((a, b) => {return b - a;})
    for (let i = 0; i < sortedCoins.length; i++) {
        while (amount >= sortedCoins[i]) {
            amount -= sortedCoins[i];
            ans.push(sortedCoins[i]);
        }
    }

    return ans;
}

const answer = solution(123); // [100, 10, 10, 1, 1, 1]
console.log(answer);