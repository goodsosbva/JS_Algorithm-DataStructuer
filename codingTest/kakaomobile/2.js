function solution(id_list, k) {
    var answer = 0;
    var dic = {};

    // 초기화
    for (let i = 0; i < id_list.length; i++) {
        var idlist = id_list[i].split(" ");
        for (let j = 0; j < idlist.length; j++) {
            if (dic[idlist[j]] === undefined) {
                dic[idlist[j]] = 0;
            }
        }
    }

    // 계산
    for (let i = 0; i < id_list.length; i++) {
        var idList = id_list[i].split(" ");
        const setlist = new Set(idList)
        const idlist = Array.from(setlist);
        for (let j = 0; j < idlist.length; j++) {
            if (dic[idlist[j]] < k) {
                answer++;
            }
            dic[idlist[j]]++;
        }    
    }
    return answer;
}

// 입력값 〉
// ["JAY", "JAY ELLE JAY MAY", "MAY ELLE MAY", "ELLE MAY", "ELLE ELLE ELLE", "MAY"], 3
// 기댓값 〉
// 8
// 실행 결과 〉
// 테스트를 통과하였습니다.