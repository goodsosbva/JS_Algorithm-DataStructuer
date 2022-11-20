function solution(monsters, bullets) {
    var answer = 0;

    var monster_inclination = {};
    var bullet_inclination = {}

    // 몬스터들의 위치에 대한 기울기 계산
    for (let i = 0; i < monsters.length; i++) {
        // 4방향 예외 처리
        var incli = 9999
        if (monsters[i][0] === 0 || monsters[i][1] === 0) {
            if (monsters[i][1] === 0) {
                if (monsters[i][0] > 0) {
                    incli = 0
                }
                else {
                    incli = 180
                }
            }
            // monster[i][0] === 0
            else {
                if (monsters[i][1] > 0) {
                    incli = 90;
                }               
                else {
                    incli = 270;
                }
            }
        }
        // 그외의 경우
        else {
            // 부호 예외 처리
            var tmp = 1;
            if (monsters[i][0] < 0 || monsters[i][1] < 0) {
                tmp = -1
            }
            var incli = monsters[i][0] / monsters[i][1];
            incli *= tmp;
        }

        if (monster_inclination[incli] === undefined) {
            monster_inclination[incli] = [[monsters[i][0], monsters[i][1]]]
        }
        else {
            monster_inclination[incli].push([monsters[i][0], monsters[i][1]])
        }
    }

    // 총알에 대한 기울기 계산
    for (let i = 0; i < bullets.length; i++) {
        var incli = 9999
        // 4방향 예외 처리
        if (bullets[i][0] === 0 || bullets[i][1] === 0) {
            if (bullets[i][1] === 0) {
                if (bullets[i][0] > 0) {
                    incli = 0
                }
                else {
                    incli = 180
                }
            }
            // monster[i][0] === 0
            else {
                if (bullets[i][1] > 0) {
                    incli = 90;
                }               
                else {
                    incli = 270;
                }
            }
        }
        // 그외의 경우
        else {
            // 부호 예외 처리
            var tmp = 1;
            if (bullets[i][0] < 0 || bullets[i][1] < 0) {
                tmp = -1
            }
            var incli = bullets[i][0] / bullets[i][1];
            incli *= tmp;
        }

        if (bullet_inclination[incli] === undefined) {
            bullet_inclination[incli] = 1
        }
        else {
            bullet_inclination[incli] += 1
        }
    }

    for (mons in monster_inclination) {
        monster_inclination[mons].sort((a, b) => a - b);
    }


    for (bul in bullet_inclination) {
        for (let i = 0; i < bullet_inclination[bul]; i++) {
            // var shifhtResult = arr.shift();
            if (monster_inclination[bul] === undefined) continue;

            if (monster_inclination[bul].length > 0) {
                answer++;
                monster_inclination[bul].shift()
            }
        }
    }

    if (answer === 0) {
        answer = -1;
    }
    return answer;
}

// 입력값 〉
// [[2, 3], [4, 5], [3, -3], [2, -4], [3, -6], [-3, -3], [-5, 0], [-4, 4]], [[4, 1], [4, 6], [1, -2], [-4, -4], [-3, 0], [-4, 4]]
// 기댓값 〉
// 5
