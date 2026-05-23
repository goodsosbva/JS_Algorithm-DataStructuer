function solution(temperature, t1, t2, a, b, onboard) {
    const MIN_TEMP = -10;
    const MAX_TEMP = 40;
    const INF = Infinity;
    const OFFSET = -MIN_TEMP;

    const dp = Array.from({ length: onboard.length }, () =>
      Array(MAX_TEMP - MIN_TEMP + 1).fill(INF)
    );

    dp[0][temperature + OFFSET] = 0;

    const direction = temperature < t1 ? 1 : -1;

    for (let i = 0; i < onboard.length - 1; i++) {
        for (let temp = MIN_TEMP; temp <= MAX_TEMP; temp++) {
            const curCost = dp[i][temp + OFFSET];
            if (curCost === INF) continue;

            const moves = [];
            
            // 1. a
            moves.push([temp + direction, a]);
            
            // 2. b
            moves.push([temp, b]);
            
            // 3. off
            let offTemp = temp;
            if (temp < temperature) offTemp = temp + 1;
            else if (temp > temperature) offTemp = temp - 1;
            moves.push([offTemp, 0]);

            for (const [nextTemp, cost] of moves) {
                if (nextTemp < MIN_TEMP || nextTemp > MAX_TEMP) continue;

                if (
                    onboard[i + 1] === 1 &&
                    (nextTemp < t1 || nextTemp > t2)
                ) continue;

                dp[i + 1][nextTemp + OFFSET] = Math.min(
                    dp[i + 1][nextTemp + OFFSET],
                    curCost + cost
                );
            }
        }
    }

    return Math.min(...dp[onboard.length - 1]);
}
