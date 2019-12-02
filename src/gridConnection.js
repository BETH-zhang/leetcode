/**
 * 在一个 n * n 的网格中，任意两点之间进行连线，求出两点网格之间的最短路径，经过的网格点
 * 必须满足，网格行走路径，向右，向下，向右下方向走，直到走到目标网格点位置      
 * 例如：
 * 输入：
  // 2 1  3 2  []
  // 1 1  3 2  [2, 1]
  // 3 2  5 5  [4, 3], [4, 4]
  // 5 5  9 11 [6, 6] [6, 7] [7, 8] [7, 9] [8, 10]
  // 1 1  4 3  [2, 2] [3, 2]
  // 1 1  5 5  [2, 2] [3, 2] [4, 3] [4, 4]
 */

var gridConnection = (point0, point1) => {
  console.log(point0, point1)
  const dx = point1[0] - point0[0] - 1
  const dy = point1[1] - point0[1] - 1
  let tdx = 0
  let tdy = 0
  if (dx && dy) {
    const points = []
    const remainYStep = dy - 2
    const remainXStep = dx - 2
    let step = 0
    let stepGroup = 0
    const direction = dx - dy // >0 向左 <0 向下 = 0 右下
    console.log('direction: ', direction)
    if (direction > 0) {
      step = Math.floor(dx / dy)
      stepGroup = dy
      if (remainYStep > 0) {
        console.log('step: ', step, dy)
      } else {
        tdx = point0[0] + 1
        tdy = point0[1] + 1
        Array(dx).fill(0).forEach((item, index) => {
          points.push([tdx + index, tdy])
        })
        return points
      }
    } else if (direction === 0) {
      step = Math.floor(dx / dy)
      stepGroup = dy
      console.log('dx: ', dx)
      console.log('dy: ', dy)
      console.log('step: ', step)
      if (remainXStep) {
        console.log('remainXStep: ', remainXStep)
        tdx = point0[0] + 1
        tdy = point0[1] + 1
        points.push([tdx, tdy])
      }
      console.log('stepGroup: ', stepGroup, step)

      if (remainYStep) {
        console.log('remainYStep: ', remainYStep)
      }
    } else if (direction < 0) {
      if (remainXStep > 0) {
        step = Math.floor(dy / dx)
        stepGroup = dx
        const remainYStep = dy - 2
        const remainXStep = dx - 2
        console.log('dx: ', dx)
        console.log('dy: ', dy)
        console.log('step: ', step)
        console.log('stepGroup: ', stepGroup)
        if (remainXStep) {
          console.log('remainXStep: ', remainXStep)
        }
        if (remainYStep) {
          console.log('remainYStep: ', remainYStep)
        }
      } else {
        tdx = point0[0] + 1
        tdy = point0[1] + 1
        console.log('remainYStep: ', remainYStep, dy)
        Array(dy).fill(0).forEach((item, index) => {
          points.push([tdx, tdy + index])
        })
        return points
      }
    }

    // const remainXStep = dx - 2
    // const remainYStep = dy - remainXStep * step
    // console.log('dx: ', dx)
    // console.log('dy: ', dy)
    // console.log('step: ', step)
    // if (remainXStep) {
    //   console.log('remainXStep: ', remainXStep)
    // }
    // if (remainYStep) {
    //   console.log('remainYStep: ', remainYStep)
    // }
    // const points = []

  } else if (dx) {
    const points = Array(dx).fill(0).map((item, index) => {
      console.log(item, index)
      return [point0[0] + index + 1, point0[1]]
    })
    return points
  } else if (dy) {
    const points = Array(dy).fill(0).map((item, index) => {
      console.log(item, index)
      return [point0[0], point0[1] + index + 1]
    })
    return points
  }
  return []
}

var gridConnection1 = (p0, p1, ss) => {
  console.log('input: *******', `${p0} `, ` ${p1}`)

  console.log(`---------t ${ss.join('  ')}`)
  // y = ax + b
  // b = y - ax
  // y0 - a * x0 = y1 - a * x1
  // a = (y0 - y1) / (x0 - y0)
  // b = y0 - a * x0
  // 使用一元一次方程求解
  const a = (p1[1] - p0[1]) / (p1[0] - p0[0])
  const b = p0[1] - a * p0[0]
  // y = a * x + b
  // x = (y - b) / a
  const dx = p1[0] - p0[0]
  const dy = p1[1] - p0[1]

  if (dx && dy) {
    // console.log(a, b)
    // console.log(dx, dy)
    const step = Math.max(dx, dy)
    // console.log('step: ', step)
    const points = Array(step - 1).fill(0).map((item, index) => {
      // console.log(index, p0[0] + index)
      if (dx >= dy) {
        const x = p0[0] + index + 1
        const y = Math.round(a * x + b)
        return [x, y]
      } else {
        const y = p0[1] + index + 1
        const x = Math.round((y - b) / a)
        return [x, y]
      }
    })
    return points
  } else if (dx) {
    const points = Array(dx).fill(0).map((item, index) => {
      return [p0[0] + index + 1, p0[1]]
    })
    return points
  } else if (dy) {
    const points = Array(dy).fill(0).map((item, index) => {
      return [p0[0], p0[1] + index + 1]
    })
    return points
  }
}

console.log(gridConnection1([1, 1], [2, 2], []))

console.log(gridConnection1([1, 1], [4, 2], [[2, 1], [3, 1]]))

console.log(gridConnection1([1, 1], [2, 4], [[2, 2], [2, 3]]))
console.log(gridConnection1([1, 1], [4, 3], [[2, 2], [3, 2]]))
console.log(gridConnection1([1, 1], [3, 4], [[2, 2], [2, 3]]))
console.log(gridConnection1([1, 1], [6, 4], [[2, 2], [3, 2], [4, 3], [4, 4]]))
console.log(gridConnection1([1, 1], [7, 4], [[2, 2], [3, 2], [4, 2], [5, 3], [6, 3]]))
console.log(gridConnection1([1, 1], [4, 8], [[2, 2], [2, 3], [2, 4], [3, 5], [3, 6], [3, 7]]))
console.log(gridConnection1([1, 1], [5, 5], [[2, 2], [3, 3], [4, 4]]))
console.log(gridConnection1([1, 1], [5, 1], [[2, 1], [3, 1], [4, 1]]))
console.log(gridConnection1([1, 1], [1, 6], [[1, 2], [1, 3], [1, 4], [1, 5]]))