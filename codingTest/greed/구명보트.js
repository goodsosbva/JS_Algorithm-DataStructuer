function solution(people, limit) {
    var answer = 0;
    people.sort((a, b) => a - b); 
    
    let left = 0;
    let right = people.length - 1;
    
    while (left <= right) {
        if (people[left] + people[right] <= limit) {
            answer += 1;
            left += 1;
            right -= 1;
        } else {
            right -= 1;
            answer += 1;
        }
    }
    return answer;
}
