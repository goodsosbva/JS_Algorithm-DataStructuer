function isValidateCords(x, y) {
  if (x >= 0 && x <= 10 && y >= 0 && y <= 10) return true;
  return false;
}

function goingGraph(x, y, dir) {
  switch (dir) {
    case "U":
      return [x, y + 1];
    case "D":
      return [x, y - 1];
    case "R":
      return [x + 1, y];
    case "L":
      return [x - 1, y];
  }
}

function solution(dirs) {
  var answer = 0;
  const visited = new Set();
  let x = 5;
  let y = 5;

  for (dir of dirs) {
    const [nx, ny] = goingGraph(x, y, dir);

    if (!isValidateCords(nx, ny)) continue;

    visited.add(`${x},${y},${nx},${ny}`);
    visited.add(`${nx},${ny},${x},${y}`);

    x = nx;
    y = ny;
  }

  answer = visited.size / 2;
  return answer;
}
