const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const cookieSession = require('cookie-session')
const routes = require('./routes/index')
const port = 3000

mongoose.connect('mongodb://localhost/blogDB', {useNewUrlParser: true})
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(cookieSession({
    name: 'session',
    keys: ['key1'],
    maxAge: 24*60*60*1000
}))
// app.get('/', (req, res)=> {
//     res.render('index.pug', {})
// })

app.use('/', routes)
app.listen(port, ()=> {
    console.log(`Listening in port ${port}...`)
})