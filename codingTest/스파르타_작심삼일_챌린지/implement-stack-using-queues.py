class MyStack:

    def __init__(self):
        self.arr = []

    def push(self, x: int) -> None:
        self.arr.append(x)

    def pop(self) -> int:
        return self.arr.pop()

    def top(self) -> int:
        if len(self.arr) == 0:
            return None
        else:
            return self.arr[-1]

    def empty(self) -> bool:
        if len(self.arr) == 0:
            return True
        else:
            return False


# Your MyStack object will be instantiated and called as such:
x = 4
obj = MyStack()
obj.push(x)
param_2 = obj.pop()
print(param_2)
param_3 = obj.top()
print(param_3)
param_4 = obj.empty()
print(param_4)