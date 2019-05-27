const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/books', { useNewUrlParser: true })
  .then(() => {
    console.log('数据库连接成功');
  })
  .catch(() => {
    console.log('数据库连接失败')
  })

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  isflag: Boolean
})

const Course = mongoose.model('Course', courseSchema)

// 删除某一条数据， 没有 id 就返回一个 null
// Course.findOneAndDelete({ _id: '5ce3835a87f2c81f54ae624d' })
//   .then(result => {
//     console.log(result);
//   })

// 删除多个
Course.deleteMany({})
  .then(result => {
    console.log(result)
  })