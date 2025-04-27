function generateDiscountCombos(m) {
  const result = [];
  const combo = new Array(m);
  const discounts = [10, 20, 30, 40];

  function dfs(depth) {
    if (depth === m) {
     
      result.push(combo.slice());
      return;
    }
    for (const d of discounts) {
      combo[depth] = d;
      dfs(depth + 1);
    }
  }

  dfs(0);
  return result;
}

function caculateDiscount(price, discountRate) {
    const discountedPrice = price * (100 - discountRate) / 100;
    
    return discountedPrice
}

function sumArr(array) {
  return array.reduce((a, b) => a + b, 0);
}


function solution(users, emoticons) {
  const n = emoticons.length;
  const combi = generateDiscountCombos(n);
    
  let bestPlusCnt = 0;
  let bestSalesAmt = 0;

  for (let i = 0; i < combi.length; i++) {
    let tmpAmount = 0;
    let tmpPlus = 0;

    for (let j = 0; j < users.length; j++) {
        const [minDiscount, plusAmountCut] = users[j];
        let userSum = 0;
        
        for (let k = 0; k < emoticons.length; k++) {
            const emoticonPrice = emoticons[k];
            const realDiscount = combi[i][k];
            
            if (realDiscount >= minDiscount) {
                userSum += caculateDiscount(emoticonPrice, realDiscount);
            }
        }

        if (userSum >= plusAmountCut) {
            tmpPlus += 1
        } else {
            tmpAmount += userSum;
        }
      }
      
      if (tmpPlus > bestPlusCnt || (tmpPlus === bestPlusCnt && (tmpAmount) > bestSalesAmt)) {
          bestPlusCnt = tmpPlus;
          bestSalesAmt = (tmpAmount);
      }
      
    }
    return [bestPlusCnt, bestSalesAmt]
}

