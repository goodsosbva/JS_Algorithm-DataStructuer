var newArr = [];
function collectStrings(obj) {
  for (var key in obj) {
    if (typeof obj[key] === "string") {
      newArr.push(obj[key])
    } else if (typeof(obj[key]) === 'object') {
      return collectStrings(obj[key]);
    } 
  }
  return newArr;
}

const obj = {
    stuff: "foo",
    data: {
        val: {
            thing: {
                info: "bar",
                moreInfo: {
                    evenMoreInfo: {
                        weMadeIt: "baz"
                    }
                }
            }
        }
    }
}

console.log(collectStrings(obj)) // ["foo", "bar", "baz"])