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