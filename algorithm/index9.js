/**
一个课件有若干页，希望给外教每页都有一个时间参考，即这页课件应该讲多长时间。

举一个例子：

[30, 45, 60, 70, 45]

表示一个总共五页的课件，每页的时间分配：

- 第一页：30秒
- 第二页：45秒
- 第三页：60秒
- 第四页：70秒
- 第五页：45秒

老师讲课的进度太快或太慢，都会影响教学质量，所以要在进度有偏差时给老师提示。

但偏差的判定又不能过于敏感，以免老师被频繁打扰。我们规定容忍 20% 的偏差。

以上述第3页为例，讲这一页的理想时间起止点是

75s ----------> 135s

第三页长度为 60s，60s * 20% = 12s，于是允许的时间范围是

75-12=63s ----------> 135+12=147s

现需要写一个程序，在超出时间范围时给出建议。

程序的输入有三项：

1. 一个数组，表示每一页的建议用时（单位是秒）
2. 当前是第几秒
3. 老师当前讲到第几页
*/

const args = require('yargs').argv
// console.log(args)
const i = args.i || [30, 45, 60, 70, 45]
const j = args.j || [0, 5, 38, 60, 70]

class Demo {
  constructor(ary, ary1) {
    this.data = ary
    this.totalTime = 0
    this.currentPage = 0
    this.currentTime = 0
    this.timeScope = {}

    this.init()
    this.start(ary1)
  }

  init() {
    // 直接计算出，每一页ppt的的正常上课时间
    let time = 0
    this.data.forEach((item, index) => {
      const startTime = time - item * 0.2;
      time = time + item
      const endTime = time + item * 0.2;
      this.timeScope[index] = [startTime, endTime]
      this.totalTime = endTime + 10
    })
    console.log(this.timeScope, this.totalTime)
  }

  start(times) {
    times.splice(0, 1)
    const timer = setInterval(() => {
      this.currentTime++
      const currentPageTimeScope = this.timeScope[this.currentPage]

      this.checkProgress(currentPageTimeScope)

      if (this.currentTime === times[0]) {
        this.currentPage++
        times.splice(0, 1)
      }
      console.log(this.currentPage, this.currentTime, times)
      if (this.currentTime >= this.totalTime) {
        clearInterval(timer)
      }
    }, 1000)
  }

  checkProgress(timeScope) {
    console.log(this.currentTime, timeScope)
    if (this.currentTime < timeScope[0]) {
      console.log(`第${this.currentPage}页：》》》》》》》》快了`)
    } else if (this.currentTime > timeScope[1]) {
      console.log(`第${this.currentPage}页：《《《《《《《《慢了`) 
    } else {
      console.log(`第${this.currentPage}页：|||||||||||||正常`) 
    }
  }

  getResult() {
    return '上课状态良好'
  }
}

console.log('**** 时间序列：', i)
console.time('----------')
const d = new Demo(i, j)
const result = d.getResult()
console.log('**** 输出的值：', result)
console.timeEnd('----------')