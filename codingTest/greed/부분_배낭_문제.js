function backpack_problem(items) {
  const n = items.length;

  for (let i = 0; i < n; i++) {
    const val = items[i][1] / items[i][0];
    items[i].push(val);
  }

  return items;
}

function solution(items, weight) {
  const c_items = backpack_problem(items);
  console.log(c_items);
  const sorted_items = c_items.sort((a, b) => b[2] - a[2]);
  let answer = 0;

  for (let i = 0; i < sorted_items.length; i++) {
    if (weight >= sorted_items[i][0]) {
      answer += sorted_items[i][1];
      weight -= sorted_items[i][0];
    } else {
      answer += sorted_items[i][2] * weight;
      break;
    }
  }

  return answer;
}

console.log(
  solution(
    [
      [10, 19],
      [7, 10],
      [6, 10],
    ],
    15
  )
);
