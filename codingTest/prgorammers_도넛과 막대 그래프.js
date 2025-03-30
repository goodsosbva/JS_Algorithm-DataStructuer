function solution(edges) {
    var answer = [];
    
    const degreeCounts = {};
    for (let i = 0; i < edges.length; i++) {
        const [from, to] = edges[i];
        
        if (!degreeCounts[from]) {
            degreeCounts[from] = {in: 0, out: 0};
        }
        if (!degreeCounts[to]) {
            degreeCounts[to] = {in: 0, out: 0};
        }
        degreeCounts[from].out++;
        degreeCounts[to].in++;
    }
    
    let specialVertex = -1;
    for (const vertex in degreeCounts) {
        if (degreeCounts[vertex].in === 0 && degreeCounts[vertex].out >= 2) {
            specialVertex = Number(vertex);
            break;
        }
    }
    
    const fEdges = new Set();
    for (const [from, to] of edges) {
        if (Number(from) !== Number(specialVertex)) fEdges.add(from);
        if (Number(to) !== Number(specialVertex)) fEdges.add(to);
    }
    
    const graph = {};
    for (const edg of fEdges) {
        graph[edg] = new Set();
    }
    
    for (const [from, to] of edges) {
        if (Number(from) === Number(specialVertex) || Number(to) === Number(specialVertex)) continue; 
        
        graph[from].add(to);
        graph[to].add(from);
    }
    
    const component = [];
    const visited = new Set();
    for (const item of fEdges) {
        if (visited.has(item)) continue;
        const comp = new Set();
        const q = [];
        
        comp.add(item);
        q.push(item);
        visited.add(item);
        
        while (q.length > 0) {
            const cur = q.shift();
            
            for (const nxt of graph[cur]) {
                if (!visited.has(nxt)) {
                    comp.add(nxt);
                    q.push(nxt)
                    visited.add(nxt);
                }
            }
        }
        
        component.push(comp);
    }
    
    const dirThunk = {};
    for (const [from, to] of edges) {
        if (from === specialVertex || to === specialVertex) continue;
        
        if (!(from in dirThunk)) {
            dirThunk[from] = [];
        }
        
        dirThunk[from].push(to);
    }
        
    let donutGraph = 0;
    let stickGraph = 0;
    let figure8Graph = 0;
    for (const comp of component) {
        const eCount = comp.size;
        let tCount = 0;
        
        for (const c of comp) {
            if (dirThunk[c]) {
                tCount += dirThunk[c].length;
            }
        }
        
        if (eCount === tCount) {
            donutGraph++;
        } 
        else if (eCount === tCount + 1) {
            stickGraph++;
        } 
        else {
            figure8Graph++;
        }
    }
    
    return [specialVertex, donutGraph, stickGraph, figure8Graph];
}
