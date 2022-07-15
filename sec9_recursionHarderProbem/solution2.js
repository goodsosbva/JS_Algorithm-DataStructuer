// 재귀 섹션 도전 과제 솔루션 2부
// capitalizeWords 솔루션

function capitalizeWords(array) {
    if (array.length === 1) {
    //   console.log(array)
    return [array[0].toUpperCase()];
  }
//   console.log(array.slice(0, -1));
  let res = capitalizeWords(array.slice(0, -1));
  res.push(array.slice(array.length - 1)[0].toUpperCase());
  return res;
}

// nestedEvenSum 솔루션

function nestedEvenSum(obj, sum = 0) {
  for (var key in obj) {
    if (typeof obj[key] === "object") {
      sum += nestedEvenSum(obj[key]);
    } else if (typeof obj[key] === "number" && obj[key] % 2 === 0) {
      sum += obj[key];
    }
  }
  return sum;
}
// capitalizeFire 솔루션

function capitalizeFirst(array) {
  if (array.length === 1) {
    return [array[0][0].toUpperCase() + array[0].substr(1)];
  }
  const res = capitalizeFirst(array.slice(0, -1));
  const string =
    array.slice(array.length - 1)[0][0].toUpperCase() +
        array.slice(array.length - 1)[0].substr(1);
  console.log(string)
  res.push(string);
  return res;
}

console.log(capitalizeFirst(["car", "taco", "banana"])); // ['Car','Taco','Banana']

// stringifyNumbers 솔루션

function stringifyNumbers(obj) {
  var newObj = {};
  for (var key in obj) {
    if (typeof obj[key] === "number") {
      newObj[key] = obj[key].toString();
    } else if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      newObj[key] = stringifyNumbers(obj[key]);
    } else {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}
// collectStrings 솔루션: Helper 메소드 재귀 버전

function collectStrings(obj) {
  var stringsArr = [];

  function gatherStrings(o) {
    for (var key in o) {
      if (typeof o[key] === "string") {
        stringsArr.push(o[key]);
      } else if (typeof o[key] === "object") {
        return gatherStrings(o[key]);
      }
    }
  }

  gatherStrings(obj);

  return stringsArr;
}
// collectStrings 솔루션: 순수 재귀 버전

function collectStrings(obj) {
  var stringsArr = [];
  for (var key in obj) {
    if (typeof obj[key] === "string") {
      stringsArr.push(obj[key]);
    } else if (typeof obj[key] === "object") {
      stringsArr = stringsArr.concat(collectStrings(obj[key]));
    }
  }

  return stringsArr;
}
