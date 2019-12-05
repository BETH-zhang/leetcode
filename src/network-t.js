/**
300个「文件」
每个「文件」传输时间：10~100ms
最多10个并发

看怎样最快干完
new Promise(setTimeout(10~100ms resolve()))

实现思路：
可以几个几个的同时传输，然后有一个传输成功之后，立马补上后面的
 */

// 分批异步操作
Promise.all1 = function(promises, singleCount = 1) {
  console.log(promises, singleCount)
  let arr = []
  let success = 0; // 成功的个数
  let failure = 0
  let count = 0 // 当前线程中执行的个数
  let index = 0 // 当前执行到第几个
  let pResolve = null
  let pReject = null

  function processData(i, data, error) {
    arr[i] = data
    if (error) {
      failure++
    } else {
      success++
    }
    
    count--
    console.log(`第${i}个线程: 结束--------`, index, data, error)
    console.log(success, ' + ', failure, ' = ', success + failure)
    if (success + failure === promises.length) {
      pResolve(arr)
    } else {
      fullThead(index)
    }
  }

  function fullThead(i) {
    if (count < singleCount && index < promises.length) {
      console.log(`第${i}个线程: 开始`)
      promises[i].then(data => {
        console.log('i-data: ', data)
        processData(i, data)
      }, (error) => {
        console.log('i-err: ', error)
        processData(i, null, error)
        pReject(error)
        throw error
      })
      count++;
      index++;
    }
  }

  return new Promise((resolve, reject) => {
    pResolve = resolve
    pReject = reject
    for (let i = 0; i < singleCount; i++) {
      fullThead(i)
    }
  })
}

Promise.all1([
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('success0')
    }, 1000)
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('success1')
    }, 2000)
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('success2')
      // reject('fail2')
    }, 3000)
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('success3')
    }, 4000)
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('success4')
    }, 5000)
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve('success5')
      reject('fail5')
    }, 6000)
  }).then((data, error) => {
    console.log('~~~~~~~ then', data, error)
  }).catch((error) => {
    console.log('~~~~~~~ error', error)
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('success6')
    }, 7000)
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('success7')
    }, 7000)
  }),
], 3).then((res, error) => {
  console.log('data-all: ', res)
  console.log('data-error: ', error)
}).catch((error) => {
  console.log('data-all-error: ', error)
})
