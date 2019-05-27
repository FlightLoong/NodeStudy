const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/books', { useNewUrlParser: true })
  .then(() => {
    console.log('success')
  })
  .catch(() => {
    console.log('fail')
  })

// 用户集合规则
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

// 文章集合规则
const postSchema = new mongoose.Schema({
  title: {
    type: String
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Persons'
  }
})

// 创建集合
const Persons = mongoose.model('Persons', userSchema)
const Post = mongoose.model('Post', postSchema)

// 创建用户与文章
Persons.create({
  name: '加油'
}).then((result) => {
  console.log(result)
})

// Post.create({
//   title: '拼搏',
//   author: '5ce6b6b2847e491044a81d0a'
// }).then((result) => {
//   console.log(result)
// })


// Post.find().populate('author')
//   .then((result) => {
//     console.log(result);
//   })