const array = [
  [9, 11, 16, 21, 28, 36, 5],
  [3, 9, 10, 29, 40, 45, 7],
  [2, 5, 12, 14, 24, 39, 33],
  [1, 6, 13, 37, 38, 40, 9],
  [1, 21, 25, 29, 34, 37, 36],
];

const dic = {}
const answer = []

for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[0].length; j++){
        
        if (dic[array[i][j]] === undefined) {
            dic[array[i][j]] = true
            answer.push(array[i][j])
        }
        else if (dic[array[i][j]] === true) {
            continue
        }
    }
}

console.log(answer);