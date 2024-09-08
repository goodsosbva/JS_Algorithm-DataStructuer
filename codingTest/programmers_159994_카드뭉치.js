class Queue {
  items = [];
  front = 0;
  rear = 0;

  constructor(arr) {
    this.items = arr;
    this.rear = arr.length;
  }

  push(itme) {
    this.item.push(item);
    this.rear++;
  }

  pop() {
    this.items.shift();
  }

  first() {
    return this.items[this.front];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

function solution(cards1, cards2, goal) {
  var answer = "";
  c1 = new Queue(cards1);
  c2 = new Queue(cards2);
  g = new Queue(goal);

  while (!g.isEmpty()) {
    if (!c1.isEmpty() && c1.first() === g.first()) {
      c1.pop();
      g.pop();
    } else if (!c2.isEmpty() && c2.first() === g.first()) {
      c2.pop();
      g.pop();
    } else {
      break;
    }
  }

  if (g.isEmpty() === true) {
    answer = "Yes";
  } else {
    answer = "No";
  }
  return answer;
}
