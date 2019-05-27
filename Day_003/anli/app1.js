// 导入 HTTP 模块
const http = require('http')
// 导入 mongoose
const mongoose = require('mongoose')

// 数据库连接
// 27017 是 mongodb 数据库的默认端口
mongoose.connect('mongodb://localhost/todolist', { useNewUrlParser: true })
  .then(() => {
    console.log('success');
  })
  .catch(() => {
    console.log('fail');
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
app.on('request', (req, res) => {
  // res.end('ok')
})

// 监听端口
app.listen(3000)
