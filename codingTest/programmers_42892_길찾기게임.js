class Node {
  constructor(info, num, left = null, right = null) {
    this.info = info;
    this.left = left;
    this.right = right;
    this.num = num;
  }

  hasLeft() {
    return this.left !== null;
  }

  hasRight() {
    return this.right !== null;
  }
}

function makeTree(nodeInfo) {
  const nodes = Array.from({ length: nodeInfo.length }, (_, i) => i + 1);
  nodes.sort((a, b) => {
    const [ax, ay] = nodeInfo[a - 1];
    const [bx, by] = nodeInfo[b - 1];
    return ay === by ? ax - bx : by - ay;
  });

  let root = null;
  for (const node of nodes) {
    if (!root) {
      root = new Node(nodeInfo[node - 1], node);
    } else {
      let parent = root;
      const newNode = new Node(nodeInfo[node - 1], node);
      while (true) {
        if (newNode.info[0] < parent.info[0]) {
          if (parent.hasLeft()) {
            parent = parent.left;
            continue;
          }
          parent.left = newNode;
          break;
        } else {
          if (parent.hasRight()) {
            parent = parent.right;
            continue;
          }
          parent.right = newNode;
          break;
        }
      }
    }
  }
  return root;
}

function preOrder(root, answer) {
  const stack = [root];

  while (stack.length) {
    const node = stack.pop();
    if (!node) {
      continue;
    }
    answer[0].push(node.num);
    stack.push(node.right);
    stack.push(node.left);
  }
}

function poshOrder(root, answer) {
  const stack = [[root, false]];

  while (stack.length) {
    const [node, visited] = stack.pop();
    if (!node) {
      continue;
    }

    if (visited) {
      answer[1].push(node.num);
    } else {
      stack.push([node, true]);
      stack.push([node.right, false]);
      stack.push([node.left, false]);
    }
  }
}

function solution(nodeinfo) {
  var answer = [[], []];
  const root = makeTree(nodeinfo);
  preOrder(root, answer);
  poshOrder(root, answer);
  return answer;
}
