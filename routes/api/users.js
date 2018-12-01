const router = require('express').Router()
const Users = require('../../models/Users')

router.post('/signin', (req, res)=> {
    Users.signin(req.body, (result, user)=> {
        if(result){
            req.session.userId = user._id
            res.redirect('/admin')
        } else res.send(false)
    })
})
router.post('/signup', (req, res)=> {
    Users.signup(req.body, result=> {
        if(result) res.send(true)
        else res.send(false)
    })
})
router.get('/signout', (req, res)=> {
    req.session.userId = null
    res.redirect('/')
})

module.exports = router