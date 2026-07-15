function is_all_visted(visited) {
    let all_visit = true;
    for (let i = 0; i < visited.length; i++) {
        if (visited[i] === false) return false;
    } 
    
    return true;
}

function dfs(infecs, Type, graph, cnt, k, answer, visited) {
    let ans = answer;
    if (cnt === k || is_all_visted(visited.slice(1))) {
        return ans;
    }
    
    let will_inf = [...infecs];
    for (const inf of infecs) {
        const q = [inf];
        visited[inf] = true; 
        
        while (q.length > 0) {
            const inf = q.pop();
            visited[inf] = true;
            
            for (let i = 0; i < graph[inf].length; i++) {
                const [node, type] = graph[inf][i];
                
                if (Type === type && visited[node] === false) {
                    q.push(node);
                    will_inf.push(node);
                    visited[node] = true;
                    ans += 1;
                }
            }
        }
    }  
    
    return answer = Math.max(
        dfs(will_inf, 1, graph, cnt + 1, k, ans, [...visited]),
        dfs(will_inf, 2, graph, cnt + 1, k, ans, [...visited]),
        dfs(will_inf, 3, graph, cnt + 1, k, ans, [...visited])
    )
}

function solution(n, infection, edges, k) {
    var answer = 1;
    let graph = Array.from({length: n + 1}, () => []);
    let visited = Array.from({length: n + 1}, () => false);
    let types = new Set([])
    
    for (let i = 0; i < edges.length; i++) {
        const [a, b, type] = edges[i];
        graph[a].push([b, type]);
        graph[b].push([a, type]);
        types.add(type);
    }
    
    answer = Math.max(    
        dfs([infection], 1, graph, 0, k, answer, [...visited]),
        dfs([infection], 2, graph, 0, k, answer, [...visited]),
        dfs([infection], 3, graph, 0, k, answer, [...visited])
    )

   
    return answer;
}
