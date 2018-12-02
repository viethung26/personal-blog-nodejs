const router = require('express').Router()
const bodyParser = require('body-parser')
const Articles = require('../models/Articles')
// middleware for update session everyminute
router.use((req, res, next)=> {
    req.session.nowInMinutes = Math.floor(Date.now()/60e3)
    next()
})
router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())
router.get('/', (req, res)=> {
    Articles.getAllInfo((result, articles)=> {
        if(result) {
            res.render('index', {articles})
        }
        else res.render('index')
    })
})

router.use('/users', require('./api/users'))
router.use('/articles', require('./api/articles'))
router.use('/admin', require('./api/admin'))
module.exports = router