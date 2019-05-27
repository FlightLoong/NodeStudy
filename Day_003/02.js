const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/books', { useNewUrlParser: true })
  .then(() => {
    console.log('数据库连接成功');
  })
  .catch(() => {
    console.log('数据库连接失败');
  })

// 创建集合规则
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  isflag: Boolean
})

// 使用 model 根据创建的集合规则来创建对象
// 第一个参数： 集合名称
// 第二个参数： 集合规则
const Course = mongoose.model('Course', courseSchema)

// 创建文档
const course = new Course({
  name: 'lilei',
  author: 'hanmeimei',
  isflag: true
})

// 将文档插入到数据库中 
course.save()
