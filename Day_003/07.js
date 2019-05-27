const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/books', { useNewUrlParser: true })
  .then(() => {
    console.log('数据库连接成功');
  })
  .catch(() => {
    console.log('数据库连接失败');
  })

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, '这是一个必填项'],
    minlength: 2,
    maxlength: 5,
    trim: true
  },
  age: {
    type: Number,
    min: 1,
    max: 120
  },
  address: {
    type: String,
    default: '北京'
  },
  province: {
    type: String,
    enum: ['合肥', '北京', '杭州', '上海']
  }
})

const post = mongoose.model('post', postSchema)

post.create({
  title: '努力',
  age: 1,
  province: '杭州'
})
  .then(result => {
    console.log(result)
  })
  .catch(err => {
    console.log(err)
  })