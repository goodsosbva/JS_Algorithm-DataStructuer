function solution(edges) {
    var answer = [];
    
    const degreeCounts = {};
    
    edges.forEach(([from, to]) => {
        if (!degreeCounts[from]) {
            degreeCounts[from] = { ingress: 0, outgress: 0};
        }
        degreeCounts[from].outgress++;
        
        if (!degreeCounts[to]) {
            degreeCounts[to] = { ingress: 0, outgress: 0}
        }
        degreeCounts[to].ingress++;
    });
    
    
    let specialVertex = -1;
    for (const vertex in degreeCounts) {
        if (degreeCounts[vertex].ingress === 0 && degreeCounts[vertex].outgress >= 2) {
            specialVertex = Number(vertex);
            break;
        }
    }
    
    const allVertices = new Set();
    for (const [from, to] of edges) {
        if (from !== specialVertex) allVertices.add(from);
        if (to !== specialVertex) allVertices.add(to);
    }
    
    const graph = {};
    for (const v of allVertices) {
        graph[v] = new Set();
    }
    
    for (const [from, to] of edges) {
        if (from === specialVertex || to === specialVertex) continue;
        
        graph[from].add(to);
        graph[to].add(from);
    }
    
    const component = new Set();
    const visited = new Set();
    for (const item of allVertices) {
        if (visited.has(item)) continue;
        const q = [];
        const comp = new Set();
        q.push(item);
        visited.add(item);
        comp.add(item);
        
        while (q.length > 0) {
            const cur = q.shift();
            
            for (const nxt of graph[cur]) {
                if (!visited.has(nxt)) {
                    q.push(nxt);
                    visited.add(nxt);
                    comp.add(nxt)
                }
            }
        }
        component.add(comp);
    }
    
    const directThunk = {};
    for (const [from, to] of edges) {
        if (from === specialVertex || to === specialVertex) continue;
        if (!(from in directThunk)) {
            directThunk[from] = [];
        }
        
        directThunk[from].push(to);
    }
    
    let donutGraph = 0;
    let stickGraph = 0;
    let figure8Graph = 0;
    for (const comp of component) {
        const vCount = comp.size;
        let tCount = 0;
        
        for (const c of comp) {
            if (directThunk[c]) {
                for (const nc of directThunk[c]) {
                    tCount++;
                }
            }
        }
        
        if (tCount === vCount) {
          donutGraph++;
        } else if (tCount === vCount - 1) {
          stickGraph++;
        } else if (tCount === vCount + 1) {
          figure8Graph++;
        }
    }
    
    return [specialVertex, donutGraph, stickGraph, figure8Graph];
}
