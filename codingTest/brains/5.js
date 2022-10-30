var a = { k1: {}, k2: {} };
var b = { k1: {} };

b.k2 = a;
console.log(b);
a.k3 = b;
console.log(a);
a.k2.l1 = 1;
console.log(a);
a.k3.k2.l2 = 1;
// 질문 해보기
console.log(a)
console.log(a.k3)

console.log("---")
var x;
for (x in a) {
    console.log(x);
}
console.log(a);
console.log(b)

// 3
// b = { k1: {], k2: {k1: {}, k2: {} } };
// 5
// b = { k1: {], k2: {k1: {}, k2: {}, l1: 1 } };
