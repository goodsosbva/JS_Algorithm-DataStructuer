const res = []
function capitalizeWords(arr) {
  // add whatever parameters you deem necessary - good luck!
  if (arr.length === 0){
      return res
  }
  let tmp = ""
  for (var a of arr[0]) {
      tmp += a.toUpperCase()
  }
  
  arr = arr.slice(1, arr.length)
  res.push(tmp)
  return capitalizeWords(arr)
}