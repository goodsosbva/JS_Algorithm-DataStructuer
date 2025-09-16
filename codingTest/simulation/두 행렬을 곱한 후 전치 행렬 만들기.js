function multiplayMatrixs(matrix1, matrix2) {
    const result = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
                result[i][j] += matrix1[i][k] * matrix2[k][j];
            }
        }
    }

    return result
}

function transposeMatrixs(matrix) {
    const result = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];   

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            result[i][j] = matrix[j][i];
        }
    }

    return result;
}

function solution(arr1, arr2) {
    const multiplayMatrix = multiplayMatrixs(arr1, arr2);
    const transpose = transposeMatrixs(multiplayMatrix);

    return transpose;
}

const answer = solution([[1,2,3],[4,5,6],[7,8,9]], [[9,8,7],[6,5,4],[3,2,1]]);
console.log(answer);