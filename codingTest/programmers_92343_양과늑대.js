class queue {
  items = [];
  front = 0;
  rear = 0;

  push(item) {
    this.items.push(item);
    this.rear++;
  }

  pop() {
    return this.items[this.front++];
  }

  isEmpty() {
    return this.front === this.rear;
  }
}

function buildTree(info, edges) {
  const tree = Array.from({ length: info.length }, () => []);
  for (const [from, to] of edges) {
    tree[from].push(to);
  }

  return tree;
}

function solution(info, edges) {
  var answer = 0;

  const tree = buildTree(info, edges);

  const q = new queue();
  q.push([0, 1, 0, new Set()]);

  while (!q.isEmpty()) {
    const [cur, sheep, wolf, visited] = q.pop();

    answer = Math.max(answer, sheep);

    for (let i = 0; i < tree[cur].length; i++) {
      visited.add(tree[cur][i]);
    }

    for (const next of visited) {
      if (info[next] === 1) {
        if (sheep > wolf + 1) {
          const newVisited = new Set(visited);
          newVisited.delete(next);
          q.push([next, sheep, wolf + 1, newVisited]);
        }
      } else {
        const newVisited = new Set(visited);
        newVisited.delete(next);
        q.push([next, sheep + 1, wolf, newVisited]);
      }
    }
  }
  return answer;
}
