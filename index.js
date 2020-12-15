require('dotenv').config()
const mongoose = require('mongoose')
const express = require ('express')
const app = express()

const BlogPost = require('./models/blog')

mongoose.connect('mongodb://127.0.0.1:27017/mongooseAssociation')

const db = mongoose.connection

db.once('open', () => {
    console.log(`Connected to MongoDB on ${db.host}: ${db.port}`)
})

db.on('error', (err) => {
    console.log('Error', err)
})

app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send('Home Route, Backend')
})

app.get('/blog', (req, res) => {
    // One way to create a post
    BlogPost.create({
        title: 'Mongoose for all mongoose',
        body: 'This is a cool blog post.',

    })
    // Another way to create a post
    const post1 = new BlogPost({
        title: 'Another Mongoose',
        body: 'Just amother blogpost, not as cool as the first though'
    })
    post1.save()
    res.send('Post completed')
})


app.get('/comment', (req, res) => {
    const post2 = new BlogPost({
        title: 'Cool maaaaan',
        body: 'Cowabunga'
    })
    // Create a comment
    const myComment = {
        header: 'This is a comment',
        content: 'Cooler content'
    }
    post2.comments.push(myComment)
    // Save comment to db
    post2.save()
    res.send(('Comment added'))
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`You are jamming to the sounds on port: ${PORT}`)
})