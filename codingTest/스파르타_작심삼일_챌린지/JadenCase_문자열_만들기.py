def solution(s):
    answer = ''

    strs = list(s)

    if isinstance(strs[0], str):
        answer += strs[0].upper()

    nextUpper = False
    for st in strs[1:]:
        if st == ' ':
            nextUpper = True
            answer += ' '

        elif nextUpper == True and isinstance(st, str):
            answer += st.upper()
            nextUpper = False

        elif isinstance(st, str) == False:
            answer += st.lower()
            nextUpper = False
        else:
            answer += st.lower()

    return answer