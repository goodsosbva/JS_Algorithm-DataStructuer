function solution(arr1, arr2) {
    answer = [];

    while (arr1.length && arr2.length) {
        const a1 = arr1[0];
        const a2 = arr2[0];

        console.log(a1, a2);

        if (a1 < a2) {
            target = arr1.shift();
            answer.push(target);
        } else {
            target = arr2.shift();
            answer.push(target);  
        }
    }
    
    while (arr1.length) {
        answer.push(arr1.shift());
    }

    while (arr2.length) {
        answer.push(arr2.shift());
    }

    return answer;
}

function solution2(arr1, arr2) {
    const merged = [];
    let i = 0, j = 0;

    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            merged.push(arr1[i]);
            i++;
        } else {
            merged.push(arr2[j]);
            j++;
        }
    }

    while (i < arr1.length) {
        merged.push(arr1[i]);
        i++;
    }

    while (j < arr2.length) {
        merged.push(arr2[j]);
        j++;
    }

    return merged;
}

answer = solution([1, 3, 5], [2, 4, 6]);
answer2 = solution2([1, 3, 5], [2, 4, 6]);
console.log(answer);
console.log(answer2);
