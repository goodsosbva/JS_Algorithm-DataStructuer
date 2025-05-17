function solution(matrix_sizes) {
    let minCost = Infinity;
    const stack = [ { sizes: matrix_sizes, cost: 0 } ];
    
    while (stack.length) {
        const {sizes, cost} = stack.pop();
        
        if (sizes.length === 1) {
            if (cost < minCost) minCost = cost;
            continue;
        }
        
        for (let i = 0; i < sizes.length - 1; i++) {
            const [r1, c1] = sizes[i];
            const [r2, c2] = sizes[i + 1];
            const mulCost = r1 * r2 * c2;
            const newCost = mulCost + cost;
            const newMatrix = [r1, c2];
            
            const newSizes = [];
            for (let j = 0; j < i; j++) {
                newSizes.push(sizes[j]);
            }
            
            newSizes.push(newMatrix);
            for (let j = i + 2; j < sizes.length; j++) {
                newSizes.push(sizes[j])
            }
            
            stack.push({sizes: newSizes, cost: newCost})
        }
    }

    return minCost;    
}
