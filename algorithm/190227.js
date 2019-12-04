/**
 * 
 * 这个题换一种说法：
 * 
 * 已知数字的范围是 1到1亿，每个都出现两次，也就是2亿个数字，
 * 随机排列。
 * 
 * 从这2亿个数中随机抽走一个数，问抽走的是哪个？
 */
const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const instream = fs.createReadStream('./199999999.txt');
// const instream = fs.createReadStream('./100.txt');
const outstream = new stream;
const rl = readline.createInterface(instream, outstream);
const oldCount = (1 + 100000000) * 50000000 * 2
let count = 0;
const startTime = new Date()
const countVal = {}
// ary.forEach((num) => {
//   if (countVal[num]) {
//     delete countVal[num]
//   } else {
//     countVal[num] = 1
//   }
// })

rl.on('line', function(line) {
  // process line here
  const num = Number(line)
  const countTmp = count
  count += num
  if (num === 10101 || num === 15830 || num === 5730) {
    console.log(`${num} + ${countTmp} = ${count}`)
  }
  // if (countVal[num]) {
  //   delete countVal[num]ls
  // } else {
  //   countVal[num] = 1
  // }
});

rl.on('close', function() {
  // do something on finish here
  console.log('count: ', count, count === 10000000099989900)
  console.log('countVal: ', JSON.stringify(countVal))
  const endTime = new Date()
  console.log('oldCount: ', oldCount)
  console.log(`num: ${oldCount} - ${count} = ${oldCount - count}`)
  console.log(`-------: ${(endTime - startTime) / 1000}ms`)
  setTimeout(() => {
    console.log('count: ', count, count === 10000000099989900) 
  }, 0)
});

// fs.readFile('./199999999.txt','utf-8',function(err,data){
//   if (err) {
//     console.error(err);
//   } else {
//     const ary = data.split('\n')
//     const oldCount = (1 + 100000000) * 50000000
//     let count = 0
//     ary.forEach((item) => {
//       const num = Number(item)
//       count += num
//     })
//     console.log(oldCount, count, oldCount - count)
//   }
// });