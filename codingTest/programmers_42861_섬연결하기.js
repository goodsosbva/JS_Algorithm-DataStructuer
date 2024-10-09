function find(parent, i) {
  if (parent[i] === i) {
    return i;
  }

  parent[i] = find(parent, parent[i]);
  return parent[i];
}

function union(parent, rank, x, y) {
  const xroot = find(parent, x);
  const yroot = find(parent, y);

  if (rank[xroot] < rank[yroot]) {
    parent[xroot] = yroot;
  } else if (rank[yroot] < rank[xroot]) {
    parent[yroot] = xroot;
  } else {
    parent[xroot] = yroot;
    rank[yroot] += 1;
  }
}

function solution(n, costs) {
  var answer = 0;

  costs.sort((a, b) => a[2] - b[2]);

  const parent = Array.from({ length: n }, (_, i) => i);

  const rank = Array(n).fill(0);

  let bridges = 0;

  for (const bridge of costs) {
    if (bridges === n - 1) {
      break;
    }

    const x = find(parent, bridge[0]);
    const y = find(parent, bridge[1]);

    if (x !== y) {
      union(parent, rank, x, y);
      answer += bridge[2];
      bridges += 1;
    }
  }
  return answer;
}
