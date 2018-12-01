const router = require('express').Router()
const Articles = require('../../models/Articles')

router.post('/', (req, res)=> {
    let userId = req.session.userId
    if(userId) {
        Articles.create(req.body, userId, (result, article)=> {
            if(result) res.send(true)
            else res.send(false)
        })
    } else res.redirect('/admin')
    
})

module.exports = router
