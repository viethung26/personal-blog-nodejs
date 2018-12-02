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
router.get('/:link', (req, res)=> {
    Articles.getByLink(req.params.link, (result, article)=> {
        res.render('view-detail', {article})
    })
})

router.post('/test', (req, res)=> {
    Articles.getAllInfo((result, all)=> {
        res.json(all)
    })
})

module.exports = router
