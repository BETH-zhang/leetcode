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

function convert(s, numRows) {
  if (s.length <= numRows) {
    return s
  }
  const oneGroupNum = numRows <= 1 ? 1 : numRows * 2 - 2
  const groupCount = Math.floor(s.length / oneGroupNum)
  const remainingCount = s.length % oneGroupNum

  const rowLenBegin = getEveryRowLength(numRows, groupCount, remainingCount)
  // 核心逻辑
  const ary = Array(s.length).fill(null)
  ary.forEach((item, i) => {
    const groupCount = Math.floor(i / oneGroupNum)
    const remainingCount = i % oneGroupNum

    const rGC = Math.floor(remainingCount / numRows)
    const rRC = remainingCount % numRows
    const rowIndex = !rGC ? rRC : numRows - rRC - 2

    let selectIndex = 0
    if (!remainingCount) {
      selectIndex = groupCount
    } else if (remainingCount === numRows - 1) {
      selectIndex = groupCount + rowLenBegin[rowIndex]
    } else {
      const n = !rGC && rRC < (rowIndex - 1) ? 0 : rGC && (rowIndex + (numRows - rowIndex) * 2 - 2 + 1) > rRC ? 2 : 1
      selectIndex = groupCount * 2 + rowLenBegin[rowIndex] + n - 1
    }
    ary[selectIndex] = s[i]
  })

  return ary.join('')
}

const example00 = convert('A', 3)
console.log(example00 === 'A')
const example0 = convert('AB', 1)
console.log(example0 === 'AB')
const example = convert('123456', 3)
console.log(example === '152463')
const example1 = convert('PAYPALISHIRING', 3)
console.log(example1 === 'PAHNAPLSIIGYIR')
const example2 = convert('PAYPALISHIRING', 4)
console.log(example2 === 'PINALSIGYAHRPI')