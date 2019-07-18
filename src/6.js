/**
 
The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

P   A   H   N
A P L S I I G
Y   I   R
And then read line by line: "PAHNAPLSIIGYIR"

Write the code that will take a string and make this conversion given a number of rows:

string convert(string s, int numRows);
Example 1:

Input: s = "PAYPALISHIRING", numRows = 3
Output: "PAHNAPLSIIGYIR"
Example 2:

Input: s = "PAYPALISHIRING", numRows = 4
Output: "PINALSIGYAHRPI"
Explanation:

P     I    N
A   L S  I G
Y A   H R
P     I
 */

const getEveryRowLength = (numRows, groupCount, remainingCount) => {
  const rowLen = Array(numRows).fill(0)
  rowLen.forEach((item, index) => {
    if (remainingCount) {
      const rGC = Math.floor(remainingCount / numRows)
      const rRC = remainingCount % numRows
      if (!index) {
        rowLen[index] = remainingCount >= 1 ? groupCount + 1 : groupCount  
      } else if (index === numRows - 1) {
        rowLen[index] = rGC ? groupCount + 1 : groupCount
      } else {
        rowLen[index] = !rGC && rRC < (index + 1) ? groupCount * 2 : rGC && (index + (numRows - index) * 2 - 2 + 1) > rRC ? groupCount * 2 + 2 : groupCount * 2 + 1
      }
    } else if(!index || index === numRows - 1) {
      rowLen[index] = groupCount
    } else {
      rowLen[index] = groupCount * 2
    }
  })

  const getLength = (i) => {
    let len = 0
    for (let j = 0; j < i; j++) {
      len += rowLen[j]
    }
    return len
  }

  const rowLenBegin = Array(numRows).fill(0)
  for (let i = 0; i < numRows; i++) {
    rowLenBegin[i] = getLength(i - 0)
  }

  return rowLenBegin 
}

const remainingCovertRow = (rGC, rRC, numRows) => {
  let row = 0
  if (!rGC) {
    row = rRC
  } else {
    row = (numRows - rRC)
  }
  console.log(rGC, rRC, numRows, row)
  return row
}

const getNewString = (s, numRows, oneGroupNum, rowLenBegin) => {
  const ary = Array(s.length).fill(null)
  ary.forEach((item, i) => {
    const groupCount = Math.floor(i / oneGroupNum)
    const remainingCount = i % oneGroupNum

    const rGC = Math.floor(groupCount / numRows)
    const rRC = remainingCount % numRows
    const index = remainingCovertRow(groupCount, remainingCount, oneGroupNum)

    let selectIndex = 0
    if (!remainingCount) {
      selectIndex = groupCount
    } else if (remainingCount === numRows - 1) {
      selectIndex = groupCount + rowLenBegin[index]
    } else {
      const n = !rGC && rRC < (index - 1) ? 0 : rGC && (index + (numRows - index) * 2 - 2 + 1) > rRC ? 2 : 1
      selectIndex = groupCount + rowLenBegin[index] + n
      console.log('2 4 2 3 ======', remainingCount, oneGroupNum, '///', index, s[i], n, selectIndex)
    }
    ary[selectIndex] = s[i]
    console.log(index, '---', i, selectIndex, s[i])
  })
  /**
   1   5
   2 4 6
   3
   */

  return ary
}

function convert(s, numRows) {
  const oneGroupNum = numRows * 2 - 2
  const groupCount = Math.floor(s.length / oneGroupNum)
  const remainingCount = s.length % oneGroupNum
  console.log('oneGroupNum=', oneGroupNum, ' groupCount=', groupCount, ' remainingCount=', remainingCount)

  const rowLen = getEveryRowLength(numRows, groupCount, remainingCount)
  console.log("rowLen: ", rowLen)
  const newS = getNewString(s, numRows, oneGroupNum, rowLen)
  console.log("newS: ", newS)

  return newS.join('')
}

const example = convert('123456', 3)
console.log(example === '152463')
// const example1 = convert('PAYPALISHIRING', 3)
// console.log(example1 === 'PAHNAPLSIIGYIR')
// const example2 = convert('PAYPALISHIRING', 4)
// console.log(example2 === 'PINALSIGYAHRPI')