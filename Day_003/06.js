const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/books', { useNewUrlParser: true })
  .then(() => {
    console.log('数据库连接成功');
  })
  .catch(() => {
    console.log('数据库连接失败')
  })

// 创建集合规则
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  password: String,
  hobbies: [String]
})

// 使用规则创建集合
const User = mongoose.model('User', userSchema)

// User.updateOne({ name: '王二麻子' }, { age: 100, name: '李狗蛋' })
//   .then(result => {
//     console.log(result)
//   })


User.updateMany({}, { age: 300 })
  .then(result => {
    console.log(result)
  })