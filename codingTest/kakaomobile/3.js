function solution(s, times) {
    var answer = [];

    var conti = 0;
    var cnt = 0;

    var dates = [];

    var s_time = s.split(":");
    const toNumbers = arr => arr.map(Number);
    const int_s = toNumbers(s_time)
    dates.push([int_s[0], int_s[1], int_s[2]])

    for (let i = 0; i < times.length; i++) {
        var time = times[i].split(":");
        const int_time = toNumbers(time)

        int_s[2] += int_time[0];

        int_s[3] += int_time[1];

        int_s[4] += int_time[2];
        int_s[5] += int_time[3];

        for (let j = 5; j > 3; j--) {
            if (int_s[j] >= 60) {
                int_s[j] %= 60;
                int_s[j - 1] += 1;
            }
        }

        if (int_s[3] >= 24) {
            int_s[2] += 1;
            int_s[3] %= 24;
        }

        if (int_s[2] >= 30) {
            int_s[1] += parseInt(int_s[2] / 30);
            int_s[2] %= 30;
        }
        if (int_s[1] >= 12) {
            int_s[0] += 1;
            int_s[1] %= 12;
        }

        dates.push([int_s[0], int_s[1], int_s[2]])
    }


    var y = (dates[dates.length - 1][0] - dates[0][0]) * 365
    var m = (dates[dates.length - 1][1] - dates[0][1]) * 30
    var d = dates[dates.length - 1][2] - dates[0][2]
    
    cnt = y + m + d + 1;
    for (let i = 0; i < dates.length - 1; i++) {
        if (dates[i + 1][2] - dates[i][2] <= 1) {
            if (dates[i + 1][2] - dates[i][2] === 0) {
                continue;
            }
            conti = 1;
        }
        else {
            conti = 0;
            break;
        }
    }
    

    answer.push(conti);
    answer.push(cnt);
    return answer;
}


// 입력값 〉
// "2021:04:12:16:08:35", ["01:06:30:00", "01:01:12:00", "00:00:09:25"]
// 기댓값 〉
// [1, 4]
// 실행 결과 〉
// 테스트를 통과하였습니다.