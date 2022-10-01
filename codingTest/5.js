var r = 4;

var circle = "";
var cnt = 0
for (let i = 0; i < r; i++) {
  // var blank = ((r - i) * i + 3) - (r * i);
  for (let k = ((r / 2) * (r - i)); k > 0; k--) {
    circle += " ";
  }

  for (let j = 0; j < r * i + 2; j++) {
    circle += "*";
  }
  circle += "\n";
}

for (let i = r; i >= 0; i--) {
    for (let k = 0; k < ((r / 2) * (r - i)); k++) {
      circle += " ";
    }
  
    for (let j = r * i + 2; j > 0; j--) {
      circle += "*";
    }
    circle += "\n";
}
  
console.log(circle);
