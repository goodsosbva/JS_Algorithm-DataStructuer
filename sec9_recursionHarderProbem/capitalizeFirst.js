const res = []
function capitalizeFirst (arr) {
  // add whatever parameters you deem necessary - good luck!
  if (arr.length === 0){
      return res
  }
  const tmp = arr[0][0].toUpperCase() + arr[0].slice(1, arr[0].length)
  arr = arr.slice(1, arr.length)
  res.push(tmp)
  return capitalizeFirst(arr)
}

// capitalizeFirst(['car','taco','banana']); // ['Car','Taco','Banana']