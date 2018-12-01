const router = require('express').Router()
const Users = require('../../models/Users')

router.get('/', (req, res)=> {
    let userId = req.session.userId
    // console.log(userId)
    if(userId) {
        Users.findById(userId, (result, user)=> {
            if(result) {
                res.render('post', {username: user.username})
            } else res.render('signin')
        })
    } else {
        res.render('signin')
    }
})

module.exports = router