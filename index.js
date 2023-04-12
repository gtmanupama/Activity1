require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const port = process.env.PORT || 8000

const app = express()

// middleware for bodyparser
app.use(bodyParser.urlencoded({extended: false}))

// get settings
const settings = require('./config/settings')

// mongo db url
const db = settings.mongoDBUrl

// attempt to connect with DB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected successfully.'))
    .catch(err => console.log(err))

// Get profile routes
const profile = require('./routes/api/profile')

app.get("/", (req, res) => {
    res.send("<h1>" + process.env.SAMPLE_STRING + "</h1>")

})

// actual routes
app.use('/api/profile', profile)

app.listen(port, () => console.log(`App running at port : ${port}`))

