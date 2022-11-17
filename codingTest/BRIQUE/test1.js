const { parse } = require("csv-parse");
const fs = require("fs");

var data = [];
const csv = fs.readFileSync("sample.csv");
csvTmp = csv.toString();
var csvFiles = csvTmp.split("\r")

// 숫자 변환
const toNumbers = arr => arr.map(Number);

for (let i = 1; i < csvFiles.length; i++) {
    var csvdata = csvFiles[i].trim().split(",")
    if (csvdata.length === 10) {
        var numbers = toNumbers(csvdata);
        // 최소값, 최대값, 합계, 평균
        var minVal = Math.min(...numbers);
        var maxVal = Math.max(...numbers);
        var summary = numbers.reduce((a, b) => (a + b));
        var m = summary / numbers.length;
        // 표준 편차
        var standardDeviation = 0;
        for (let i = 0; i < numbers.length; i++) {
            standardDeviation += (numbers[i] - m) ** 2 
        }
        standardDeviation = Math.sqrt(standardDeviation / numbers.length);
        // 중간값
        var midValue = numbers.sort((a, b) => a - b)[numbers.length / 2 << 0]
        
        data.push([minVal, maxVal, summary, m, standardDeviation, midValue])
    }
}

console.log(data);