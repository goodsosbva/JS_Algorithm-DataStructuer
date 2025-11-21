function solution(today, terms, privacies) {
    var answer = [];

    let dic = {};
    for (const term of terms) {
        const [t, range] = term.split(" ");
        dic[t] = Number(range);
    }

    for (let i = 0; i < privacies.length; i++) {
        const [cur, term] = privacies[i].split(" ");

        let [year, month, day] = cur.split(".");
        const plus = dic[term];

        day = Number(day);
        month = Number(month);
        year = Number(year);

        day += Number(plus) * 28;

        while (day > 28) {
            day -= 28;
            month += 1;

            if (month > 12) {
                year += 1;
                month = 1;
            }
        }

        day -= 1;
        if (day === 0) {
            month -= 1;
            day = 28;

            if (month === 0) {
                month = 12;
                year -= 1;
            }
        }

        const [ty, tm, td] = today.split(".").map(Number);

        if (
            ty > year ||
            (ty === year && tm > month) ||
            (ty === year && tm === month && td > day)
        ) {
            answer.push(i + 1);
        }
    }

    return answer;
}
