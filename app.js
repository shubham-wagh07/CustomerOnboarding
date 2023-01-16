const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const port = process.env.port || 8090;
const bodyParser = require('body-parser');

const authRoute = require('./routes/auth-route')

mongoose.connect(
    "mongodb://localhost:27017/project",
    function (err) {
        if (err) {
            console.log("Db is not connected")
        } else {
            console.log("Db connected")
        }
    })
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use('/auth', authRoute)
app.listen(port, function () {
    console.log("server is ready : " + port)
})

