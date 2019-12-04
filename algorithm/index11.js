/**
探测第一个可用的文件名

指定一个文件名，例如 file.txt，判断它在指定目录下是否可用。如果不可用则文件名序号加1（ file.txt —> file(1).txt —> file(2).txt ），直到找到可用的文件名。

路径： https://uskid.oss-cn-beijing.aliyuncs.com/temp/ 
文件：file.txt

要求：
原生 JS（允许用 Node 原生 API），不能用库。

async function getAvailableName(baseUrl, fileName) {

}

let availableName = await getAvailableName('https://uskid.oss-cn-beijing.aliyuncs.com/temp/ ', 'file.txt')
 */
const fs = require('fs')
const path = require('path')
const https = require('https')
const args = require('yargs').argv
const filepath = args.path || 'https://uskid.oss-cn-beijing.aliyuncs.com/temp/'
const filename = args.name || 'file.txt'

class Demo {
  constructor(filepath, filename) {
    this.filename = filename
    this.filepath = filepath
    this.result = null
    // this.init()
    this.init1(filepath, filename) 
  }

  init() {
    this.getFileName(this.filepath, this.filename.split('.')[0], this.filename.split('.')[1]).then((res) => {
      this.result = res
      console.log('fileName: ', res)
    })
  }

  async getFileName(dir, name, ext, index = 0) {
    let result;
    let filename = `${name}${index ? `(${index})` : ''}.${ext}`;
    try {
      // fs.accessSync(`${dir}${filename}`);
      const data = await this.getContent(`${dir}${filename}`)
      console.log('有权限访问', data)
      if (data) {
        result = this.getFileName(dir, name, ext, ++index);
      } else {
        result = filename 
      }
    } catch (err) {
      console.log('无权限访问', err)
      result = filename
    }
    console.log('result: ', result)
    return result;
  }

  getContent(url) {
    return new Promise((resolve, reject) => {
      const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.80 Safari/537.36'
      }
    
      // 因为网站通过识别cookie来进行反爬虫措施
      https.get(url, headers, function(res) {
        let chunks = ''
        let size = 0
        res.on('data', function(chunk) {
          // 监听事件传输
          chunks += chunk
          size += chunks.length
        })
    
        res.on('end', function() {
          const html = chunks.toString()
          if (html.indexOf('Error') > -1) {
            resolve('')
          }
          resolve(html)
        })
      })
    })
  }
  
  async init1(baseUrl, fileName) {
    let i = 1
    let f = path.parse(fileName)
    let targetName = fileName
    while(1) {
      const statusCode = await this.getFile(baseUrl, fileName)
      if (statusCode === 404) {
        break
      }
      targetName = `${f.name}(${i})${f.ext}`
      i++
    }
    console.log(targetName)
  }

  getFile(path) {
    return new Promise((resolve, reject) => {
      // https.get(path, (res) => {
      //   console.log(res, '---')
      //   resolve(res)
      // })
      https.request({
        method: 'head',
        url: path,
      })
    })
  }
}

const demo = new Demo(filepath, filename)
console.log('当前文件名称：', demo, demo.result)