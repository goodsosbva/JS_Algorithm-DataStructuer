function solution(genres, plays) {
  var answer = [];

  const n = genres.length;
  let dic = {};
  let totalDic = {};
  for (let i = 0; i < n; i++) {
    if (!dic[genres[i]]) {
      const playNumber = plays[i];
      const index = i;
      const item = [playNumber, index];

      dic[genres[i]] = [];
      dic[genres[i]].push(item);
      totalDic[genres[i]] = playNumber;
    } else {
      const playNumber = plays[i];
      const index = i;
      const item = [playNumber, index];

      dic[genres[i]].push(item);
      totalDic[genres[i]] += playNumber;
    }
  }

  const entries = Object.entries(totalDic);
  const sortedEntries = entries.sort((a, b) => -(a[1] - b[1]));

  for (const key in dic) {
    dic[key].sort((a, b) => -(a[0] - b[0]));
  }

  for (const item of sortedEntries) {
    const genre = item[0];

    const length = Math.min(dic[genre].length, 2);
    for (let i = 0; i < length; i++) {
      answer.push(dic[genre][i][1]);
    }
  }
  return answer;
}
