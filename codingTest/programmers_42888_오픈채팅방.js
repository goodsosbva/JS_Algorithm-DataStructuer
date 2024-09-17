function solution(record) {
  var answer = [];

  let dic = {};
  for (let i = 0; i < record.length; i++) {
    cmd = record[i].split(" ");

    if (cmd[0] === "Enter" || cmd[0] === "Change") {
      dic[cmd[1]] = cmd[2];
    }
  }

  for (let i = 0; i < record.length; i++) {
    cmd = record[i].split(" ");

    if (cmd[0] === "Enter") {
      answer.push(`${dic[cmd[1]]}님이 들어왔습니다.`);
    } else if (cmd[0] === "Leave") {
      answer.push(`${dic[cmd[1]]}님이 나갔습니다.`);
    }
  }
  return answer;
}
