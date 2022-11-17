const axios = require('axios');

const getData = async () => {
  try {
    return await axios.get('http://codingtest.brique.kr:8080/random');
  } catch (error) {
    console.error(error);
  }
};

var datas = [];
var countDic = {};
var rememberDic = {};
const execFunction = async () => {
    const data = await getData();
    // console.log(data.data);
    return data.data
};


const forLoop = async _ => {
    console.log('Start')
    
    const loopCnt = 100;
    for (let i = 0; i < loopCnt; i++) {
        const data = await execFunction();
        datas.push(data);
    }

    for (let i = 0; i < datas.length; i++) {
        if (countDic[datas[i].id] === undefined) {
            countDic[datas[i].id] = 1;
            rememberDic[datas[i].id] = datas[i].quote;
        }
        else {
            countDic[datas[i].id]++;
        }
    }

    var answer = [];
    var sortable = [];
    for (var num in countDic) {
        sortable.push([num, countDic[num]]);
    }

    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });
    for (let i = 0; i < sortable.length; i++) {
        answer.push([`count: ${sortable[i][1]} 'id': ${sortable[i][0]} 'quotes': ${rememberDic[sortable[i][0]]}`])
    }
    console.log(answer);
    console.log(`Total count: ${loopCnt}`);
    console.log('End')

}

forLoop();