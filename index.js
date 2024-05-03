"use strict"
//   Personnel API
/*
    $ npm i express dotenv mongoose express-async-errors
    $ npm i cookie-session
    $ npm i jsonwebtoken
*/

const express = require('express')
const app = express()

/* ------------------------------------------------------- */

//env Variables
require('dotenv').config()
const PORT = process.env.PORT || 8000

require('express-async-errors')


//Connection to DB
const { dbConnection } = require('./src/configs/dbConnection')
dbConnection()

//Middlewares

//Accept JSON
app.use(express.json())

//SessionsCookie
app.use(require('cookie-session')({ secret: process.env.SECRET_KEY }))

//res.getModelList()
app.use(require('./src/middlewares/findSearchSortPage'))

// Login/Logout Control Middleware 
app.use(async (req, res, next) => {

    const Personnel = require('./src/models/personnel.model')

    req.isLogin = false

    if (req.session?.id) {

        const user = await Personnel.findOne({ _id: req.session.id })

        // if (user && user.password == req.session.password) { 
        //     req.isLogin = true
        // }
        req.isLogin = user && user.password == req.session.password
    }
    console.log('isLogin: ', req.isLogin)

    next()
})

/*----------------*/
//Routes

//HomePath
app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to PERSONNEL API',
        session: req.session,
        isLogin: req.isLogin
    })
})

//deparments route
app.use('/departments', require('./src/routes/department.router'))
// /personnels
app.use('/personnels', require('./src/routes/personnel.router'))

/* ------------------------------------------------------- */

// errorHandler:
app.use(require('./src/middlewares/errorHandler'))

// RUN SERVER:
app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT))

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')()