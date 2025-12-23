class Queue {
  constructor(init = []) {
      this.data = {};
      this.head = 0;
      this.tail = 0;
      this.sum = 0;
      
      for (const v of init) {
        this.enqueue(v);
      }
  }

  enqueue(value) {
      this.data[this.tail++] = value;
      this.sum += value;
  }

  dequeue() {
      if (this.head === this.tail) return undefined;
      const value = this.data[this.head];
      delete this.data[this.head++];
      this.sum -= value;
    return value;
  }

  size() {
    return this.tail - this.head;
  }
}


function solution(queue1, queue2) {
    var answer = 0;
    
    const total = queue1.length * 4;
    const q1 = new Queue(queue1);
    const q2 = new Queue(queue2);
    
    while (q1.sum !== q2.sum) {
        if (q1.sum > q2.sum) {
            const val = q1.dequeue();
            q2.enqueue(val);
            answer += 1;
        }
        else if (q1.sum < q2.sum) {
            const val = q2.dequeue();
            q1.enqueue(val);
            answer += 1;
        }
        
        if (answer === total) return -1;
    }
    return answer;
}
