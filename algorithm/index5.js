/**
再例如 城市套路.json

[
  {
    "item": "价值998元试听课",
    "probability": 0.5
  },
  {
    "item": "3000元免息贷款",
    "probability": 0.5
  },
  {
    "item": "100块话费",
    "probability": 0
  }
]

奖品数目无上限，验证你的概率是否接近规则，形式不限。
// 随机：伪随机 先体现排好顺序，再执行
// 洗牌算法
seq 1000 > 1.txt
cat 1.txt | sort -R
 */
const args = require('yargs').argv
const i = args.i

class Draw {
  constructor(data) {
    this.data = data
    this.interval = [] 
    this.testData = []
    this.total = 0
  }

  format() {
    const data = this.data
    data.forEach((item, index) => {
      const num = index ? this.interval[index - 1] : 0
      this.interval.push(item.probability + num)
      this.testData.push(0)
      this.total += item.probability
    })
    console.log('数据格式化：', this.total, this.interval)
  }

  run() {
    const num = Math.random() * this.total
    let tag = 0
    for (let i = 0; i< this.interval.length; i++) {
      if (num <= this.interval[i]) {
        tag = i
        break
      }
    }
    const testItem = this.testData[tag]
    this.testData[tag] = testItem + 1
    // console.log('生成的随机数：', this.i, num, tag, this.testData)
    return this.data[tag].probability
  }

  test(count) {
    this.format(this.data)
    console.time('---- test ----')
    for (let i = 0; i < count; i++) {
      this.run()
    }
    console.log('测试次数：', count)
    console.log('测试结果：', this.testData)
    this.testData.forEach((num, index) => {
      console.log(`测试【${this.data[index].item}】的占比：${num / count}`, '~~~~~~~', `目标占比：${this.data[index].probability}`)
    })
    console.timeEnd('---- test ----')
  }
}

const data = [
  {
    "item": "价值998元试听课",
    "probability": 0.35
  },
  {
    "item": "3000元免息贷款",
    "probability": 0.42
  },
  {
    "item": "100块话费",
    "probability": 0.23
  } 
]

const draw = new Draw(data)
draw.test(i)
