function solution(n, works) {
    works.sort((a, b) => b - a);
   
    let idx = 0;
    
    console.log(works);
    while (n > 0) {
      if (works[idx] < works[idx + 1]) {
        idx += 1;
        continue;
      }
   
      if (works[idx - 1] === works[idx]) {
        idx = 0;
        continue;
      }
   
      works[idx] -= 1;
      n -= 1;
    }
   
    return works.reduce((acc, cur) => (cur > 0 ? acc + cur ** 2 : acc), 0);
}
  
console.log(solution(4, [4, 3, 3]));