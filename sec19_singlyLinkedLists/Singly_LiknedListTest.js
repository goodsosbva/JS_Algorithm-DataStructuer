class Node{
    constructor(val){
        this.val = val;
        this.next = null;
    }
}

class SinglyLinkedList{
    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    push(val) {
        var newNode = new Node(val);
        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        }
        else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }
    pop(val) {
        if (!this.head) return undefined;
        var cur = this.head;
        var newTail = cur
        while(cur.next){
            newTail = cur.next;
            cur = cur.next;
        }
        cur.tail = newTail;
        cur.tail.next = null
        this.length--;
        if (this.lenght === 0) {
            this.head = null;
            this.tail = null;
        }
        return cur;
    }
    shift() {
        if (!this.head) return undefined;
        var cur = this.head;

        if (cur.next) {
            this.head = cur.next;
            this.length--;
        }
        else {
            this.length--;
            this.head = null;
            this.tail = null;
        }
        return cur;
    }
    unshift(val) {
        var newNode = new Node(val);
        if (!this.head) {
            this.head = null;
            this.tail = this.head;
            this.length++;
        }
        else {
            newNode.next = this.head;
            this.head = newNode;
            this.length++;
        }
        return this;

    }
    
}

var list = new SinglyLinkedList()
list.push("HELLO")
list.push("GOODBYE")
list.push("!")

console.log(list.shift());
console.log(list.shift());
console.log(list.shift());
console.log(list);
console.log(list.shift());
