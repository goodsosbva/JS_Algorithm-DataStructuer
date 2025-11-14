def solution(k, tangerine):
    answer = 0
    
    dic = {}
    for i in range(len(tangerine)):
        if tangerine[i] not in dic:
            dic[tangerine[i]] = 1;
        else:
            dic[tangerine[i]] += 1;
        
  
    sorted_dic = sorted(dic.items(), key= lambda item:item[1], reverse=True)
    
    while k > 0:
        key, value = sorted_dic.pop(0)
        
        k -= value
        answer += 1
        
    
    return answer
