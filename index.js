"use strict"
/* --------------------------------------------------- */
/*
    $ npm i express dotenv mongoose express-async-errors
    $ npm i cookie-session
    $ npm i jsonwebtoken
*/
const express = require('express')
const app = express()

/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env:
require('dotenv').config()
const PORT = process.env?.PORT || 8000

// asyncErrors to errorHandler:
require('express-async-errors')

/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
const { dbConnection } = require('./src/configs/dbConnection')
dbConnection()

/* ------------------------------------------------------- */
// Middlewares:

// Accept JSON:
app.use(express.json())

// SessionsCookies:
// app.use(require('cookie-session')({ secret: process.env.SECRET_KEY }))

// res.getModelList():
app.use(require('./src/middlewares/findSearchSortPage'))

//* Moved -> middlewares/authentication.js
// const jwt = require('jsonwebtoken')

// app.use((req, res, next) => {
//     const auth = req.headers?.authorization || null // get Authorization 
//     const accessToken = auth ? auth.split(' ')[1] : null // get JWT 

//     req.isLogin = false

//     jwt.verify(accessToken, process.env.ACCESS_KEY, function(err, user) {  
//         if (err) { 
//             req.user = null 
//             console.log('JWT Login: NO')
//         } else { 
//             req.isLogin = true 
//             req.user = user 
//             // req.user = user.isActive ? user : null
//             console.log('JWT Login: YES') 
//         }
//     })
//     next()
// })
app.use(require('./src/middlewares/authentication'))

/* ------------------------------------------------------- */
// Routes:

// HomePath:
app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to PERSONNEL API',
        // session: req.session,
        isLogin: req.isLogin,
        user: req.user
    })
})

// /auth
app.use('/auth', require('./src/routes/auth.router'))
// /departments
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