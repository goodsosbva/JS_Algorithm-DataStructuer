function check110(arr, idx) {
  if (idx - 1 < 0) return false;
  if (idx - 2 < 0) return false;

  if (arr[idx - 2] !== "1") return false;
  if (arr[idx - 1] !== "1") return false;

  return true;
}

function changeArr(restStr, marker, cnt110) {
  if (cnt110 <= 0) return restStr;
  const insertStr = "110".repeat(cnt110);
  return restStr.slice(0, marker) + insertStr + restStr.slice(marker);
}

function solution(s) {
  var answer = [];

  for (let i = 0; i < s.length; i++) {
    const x = s[i];

    let stack = [];
    let cnt110 = 0;

    for (let j = 0; j < x.length; j++) {
      stack.push(x[j]);

      if (stack.length >= 3 && stack[stack.length - 1] === "0" && check110(stack, stack.length - 1)) {
        stack.pop(); stack.pop(); stack.pop();
        cnt110++;
      }
    }
    
    const restStr = stack.join("");
    const lastZeroIdx = restStr.lastIndexOf("0");
    const marker = lastZeroIdx === -1 ? 0 : lastZeroIdx + 1;

    answer.push(changeArr(restStr, marker, cnt110));
  }

  return answer;
}
