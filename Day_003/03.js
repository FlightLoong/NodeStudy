const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/books', { useNewUrlParser: true })
  .then(() => {
    console.log('数据库连接成功')
  })
  .catch(() => {
    console.log('数据库连接失败')
  })

// 创建集合规则
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  isflag: Boolean
})

// 使用 model 根据创建的集合规则来创建对象
// 第一个参数是： 集合的名称
// 第二个参数是： 集合的规则
const Course = mongoose.model('Course', courseSchema)

// 插入数据的第二种方式
// Course.create({
//   name: 'dakang',
//   author: 'dakang',
//   isflag: false
// }, (err, doc) => {
//   console.log(err)
//   console.log(doc);
// })

// 插入数据的第三种方式
Course.create({
  name: 'hanhan',
  author: 'hanhan',
  isflag: true
}).then((doc) => {
  console.log(doc);
}).catch((err) => {
  console.log(err)
})