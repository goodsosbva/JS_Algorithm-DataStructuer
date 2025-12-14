function cutArr (x1, y1, x2, y2, arr) {
    const result = arr
    .slice(x1, x2)        
    .map(row => row.slice(y1, y2));
    
    return result;
}

function dfs(arr) {
    if (arr.length === 1) return arr[0][0];
    
    const y = arr.length;
    const x = arr[0].length;
    
    const stVal = arr[0][0];
    let isZip = true;
    for (let i = 0; i < y; i++) {
        for (let j = 0; j < x; j++) {
            if (stVal !== arr[i][j]) {
                isZip = false;
                break;
            };
        }
    }
    
    if (isZip) {
        return stVal;
    }
    
    if (!isZip) { 
        const arr1 = dfs(cutArr(0, 0, y / 2, x / 2, arr));
        const arr2 = dfs(cutArr(0, x / 2, y / 2, x, arr));
        const arr3 = dfs(cutArr(y / 2, 0, y, x / 2, arr));
        const arr4 = dfs(cutArr(y / 2, x / 2, y, x, arr));
        
        return [arr1, arr2, arr3, arr4];
    }
}

function countZip(data) {
    let zero = 0;
    let one = 0;

    function traverse(node) {
        if (typeof node === 'number') {
            if (node === 0) zero += 1;
            else if (node === 1) one += 1;
            return;
        }

        for (const v of node) {
            traverse(v);
        }
    }

    traverse(data);
    return [zero, one];
}


function solution(arr) {
    let zero = 0;
    let one = 0;
    
    const zippedArr = dfs(arr);
    
    const answer = countZip(zippedArr)
    return answer;
}
