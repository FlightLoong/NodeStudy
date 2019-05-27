// 导入 HTTP 模块
const http = require('http')
// 导入 url 模块
const url = require('url')
// 导入 querystring 模块
const querystring = require('querystring')
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
  const { pathname, query } = url.parse(req.url, true)

  if (method == 'GET') {
    // 呈现用户列表页面
    if (pathname == '/list') {
      // 查询用户信息
      let users = await User.find()
      console.log('--------------')
      console.log(users)

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
                <a href="/add" class="btn btn-primary">添加用户</a>
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
              <a href="/modify?id=${item._id}" class="btn btn-success btn-xs">修改</a>
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
    } else if (pathname == '/add') {
      let add = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>用户列表</title>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
        </head>
        <body>
          <div class="container">
            <h3>添加用户</h3>
            <form method="post" action="/add">
              <div class="form-group">
                <label>用户名</label>
                <input name="name" type="text" class="form-control" placeholder="请填写用户名">
              </div>
              <div class="form-group">
                <label>密码</label>
                <input name="password" type="password" class="form-control" placeholder="请输入密码">
              </div>
              <div class="form-group">
                <label>年龄</label>
                <input name="age" type="text" class="form-control" placeholder="请填写邮箱">
              </div>
              <div class="form-group">
                <label>邮箱</label>
                <input name="email" type="email" class="form-control" placeholder="请填写邮箱">
              </div>
              <div class="form-group">
                <label>请选择爱好</label>
                <div>
                  <label class="checkbox-inline">
                    <input type="checkbox" value="足球" name="hobbies"> 足球
                  </label>
                  <label class="checkbox-inline">
                    <input type="checkbox" value="篮球" name="hobbies"> 篮球
                  </label>
                  <label class="checkbox-inline">
                    <input type="checkbox" value="橄榄球" name="hobbies"> 橄榄球
                  </label>
                  <label class="checkbox-inline">
                    <input type="checkbox" value="敲代码" name="hobbies"> 敲代码
                  </label>
                  <label class="checkbox-inline">
                    <input type="checkbox" value="抽烟" name="hobbies"> 抽烟
                  </label>
                  <label class="checkbox-inline">
                    <input type="checkbox" value="喝酒" name="hobbies"> 喝酒
                  </label>
                  <label class="checkbox-inline">
                    <input type="checkbox" value="烫头" name="hobbies"> 烫头
                  </label>
                </div>
              </div>
              <button type="submit" class="btn btn-primary">添加用户</button>
            </form>
          </div>
        </body>
        </html>
      `
      res.end(add)
    } else if (pathname == '/modify') {
      let user = await User.findOne({ _id: query.id })
      let hobbies = ['足球', '篮球', '橄榄球', '敲代码', '抽烟', '喝酒', '烫头']
      console.log(user)
      let modify = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>修改列表</title>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
        </head>
        <body>
          <div class="container">
            <h3>添加用户</h3>
            <form method="post" action="/modify?id=${user._id}">
              <div class="form-group">
                <label>用户名</label>
                <input value="${user.name}" name="name" type="text" class="form-control" placeholder="请填写用户名">
              </div>
              <div class="form-group">
                <label>密码</label>
                <input value="${user.password}" name="password" type="password" class="form-control" placeholder="请输入密码">
              </div>
              <div class="form-group">
                <label>年龄</label>
                <input value="${user.age}" name="age" type="text" class="form-control" placeholder="请填写邮箱">
              </div>
              <div class="form-group">
                <label>邮箱</label>
                <input value="${user.email}"  name="email" type="email" class="form-control" placeholder="请填写邮箱">
              </div>
              <div class="form-group">
                <label>请选择爱好</label>
                <div>
      `

      hobbies.forEach(item => {
        let isHobby = user.hobbies.includes(item)

        if (isHobby) {
          modify += `
            <label class="checkbox-inline">
              <input type="checkbox" value="${item}" name="hobbies" checked>${item}
            </label>
          `
        } else {
          modify += `
            <label class="checkbox-inline">
              <input type="checkbox" value="${item}" name="hobbies">${item}
            </label>
          `
        }
      })

      modify += `
                </div>
              </div>
              <button type="submit" class="btn btn-primary">添加用户</button>
            </form>
          </div>
        </body>
        </html>
      `

      res.end(modify)
    }
  } else if (method == 'POST') {
    if (pathname == '/add') {
      // 接受用户提交的信息
      let formData = ''
      // 处理 post 请求
      req.on('data', (param) => {
        formData += param
      })

      req.on('end', async () => {
        // console.log(querystring.parse(formData))

        // 将用户提交的信息添加到数据库中
        let users = querystring.parse(formData)
        await User.create(users)

        // 添加到数据库之后进行重定向
        res.writeHead(301, {
          Location: '/list'
        })

        res.end()

      })

      // 将用户提交的数据追加到数据库中
    } else if (pathname == '/modify') {
      let formData = ''

      req.on('data', param => {
        formData += param
      })

      req.on('end', async () => {
        let user = querystring.parse(formData)

        await User.updateOne({ _id: query.id }, user)
      })

      res.writeHead(301, {
        Location: '/list'
      })

      res.end()
    }
  }

  // res.end('ok')
})

// 监听端口
app.listen(3030)