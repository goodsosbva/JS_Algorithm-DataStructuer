function solution(book_time) {
    var answer = 0;
    
    let times = [];
    for (const time_r of book_time) {
        const [st, end] = time_r;
        const [s1, s2] = st.split(":");
        
        
        const [e1, e2] = end.split(":");
        
        const t1 = Number(s1) * 60 + Number(s2);
        const t2 = Number(e1) * 60 + Number(e2);
        
        let tmp = [Number(t1), Number(t2)];
        times.push(tmp);
    }
    
    times.sort((a, b) => a[0] - b[0]);
    
    answer += 1;
    let books = [[times[0]]];
    for (let i = 1; i < times.length; i++) {
        const [st, end] = times[i];
        let tmp_books = books;
        let need_room = true;
        
        let rooms = 1;
        for (let q = 0; q < books.length; q++) {
            for (let w = 0; w < books[q].length; w++) {
                const [bst, bend] = books[q][w];
                
                if (bst >= end + 10 || bend + 10 <= st) {
                    need_room = false;
                } else {
                    need_room = true;
                }
            }
            
            if (need_room) {
                rooms += 1;
            }
            
            if (rooms > books.length) {
                let tmp = [times[i]];
                tmp_books.push(tmp);
                break;
            };
            
            if (!need_room) {
                tmp_books[q].push(times[i]);
                break;
            };
        }
        
        if (need_room) answer += 1;
        books = tmp_books;
        rooms = books.length;
    }
    
    return answer;
}
