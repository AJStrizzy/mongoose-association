require('dotenv').config()
const mongoose = require('mongoose')
const express = require ('express')
const app = express()

const db = require('./models/blog')

mongoose.connect('mongodb://127.0.0.1:27017/mongooseAssociation')

app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send('Home Route, Backend')
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`You are jamming to the sounds on port: ${PORT}`)
})