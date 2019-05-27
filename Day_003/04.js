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

// 查找用户集合的所有文档
// User.find().then(result => console.log(result))

// 根据 id 字段查找文档
// User.find({ _id: '5c09f1e5aeb04b22f8460965' })
//   .then((result) => {
//     console.log(result)
//   })

// findOne 方法返回一条文档，默认返回当前集合中的第一条文档
// User.findOne({ name: '李四' }).then(result => {
//   console.log(result)
// })

// 匹配大于小于
// User.find({ age: { $gt: 20, $lt: 50 } })
//   .then(result => {
//     console.log(result);
//   })

// 匹配包含
// User.find({ hobbies: { $in: ['敲代码'] } })
//   .then(result => {
//     console.log(result);
//   })

// 选择要查询的字段
// User.find().select('name email')
//   .then(result => {
//     console.log(result);
//   })

// 将数据按照大小进行排序
// User.find().sort('age')
//   .then(result => {
//     console.log(result);
//   })

// skip --- 从第几条数据开始查询
// limit --- 查询几条数据
User.find().skip(2).limit(2)
  .then(result => {
    console.log(result);
  })