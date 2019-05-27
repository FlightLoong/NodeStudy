// 导入 HTTP 模块
const http = require('http')

// 导入 url 模块
const url = require('url')
// 导入 mongoose
const mongoose = require('mongoose')

// 数据库连接
// 27017 是 mongodb 数据库的默认端口
mongoose.connect('mongodb://localhost/todolist', { useNewUrlParser: true })
  .then(() => {
    console.log('success')
  })
  .catch(() => {
    console.log('fail')
  })

// 创建用户集合规则
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20
  },
  age: {
    type: Number,
    min: 18,
    max: 80
  },
  password: String,
  email: String,
  hobbies: [String]
})

// 创建集合 返回集合构造函数
const User = mongoose.model('User', userSchema)

// 创建服务器
const app = http.createServer()

// 监听请求
app.on('request', async (req, res) => {
  // 请求方式
  const method = req.method

  // 请求地址
  const { pathname } = url.parse(req.url)

  if (method == 'GET') {
    // 呈现用户列表页面
    if (pathname == '/list') {
      // 查询用户信息
      let users = await User.find()

      // 拼接 html 字符串
      let list = `
        <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>用户列表</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
          </head>
          <body>
            <div class="container">
              <h6>
                <a href="add.html" class="btn btn-primary">添加用户</a>
              </h6>
              <table class="table table-striped table-bordered">
                <tr>
                  <td>用户名</td>
                  <td>年龄</td>
                  <td>爱好</td>
                  <td>邮箱</td>
                  <td>操作</td>
                </tr>
      `

      users.forEach(item => {
        list += `
        <tr>
          <td>${item.name}</td>
          <td>${item.age}</td>
          <td>
        `

        item.hobbies.forEach(item => {
          list += `<span>${item}</span>`
        })

        list += `
          </td>
            <td>${item.email}</td>
            <td>
              <a href="" class="btn btn-danger btn-xs">删除</a>
              <a href="" class="btn btn-success btn-xs">修改</a>
            </td>
          </tr>
        `
      })

      list += `
        </table>
          </div>
        </body>
        </html>
      `

      res.end(list)
    }
  } else if (method == 'POST') {

  }

  // res.end('ok')
})

// 监听端口
app.listen(3000)
