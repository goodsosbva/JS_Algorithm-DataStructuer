// fib(4) // 3
// fib(10) // 55
// fib(28) // 317811
// fib(35) // 9227465

function fib(n){
    // add whatever parameters you deem necessary - good luck!
    if (n == 1) {
        return 1;
    }
    
    if (n == 2) {
        return 1;
    }
    
    return fib(n - 1) + fib(n - 2)
  }