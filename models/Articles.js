const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId
const ArticleSchema = new Schema({
    title: String,
    content: String,
    author: ObjectId,
    link: String
}, {timestamps: true})

const articles = mongoose.model('articles', ArticleSchema)

exports.getAllInfo = function(callback) {
    articles.find().select(['title', 'content', 'createdAt', 'link']).populate({
        path: 'author',
        select: ['username'],
        model: 'users',

    }).exec((err, items)=> {
        if(err) callback(false)
        else callback(true, items)
    })
}

exports.getByLink = function(link, callback) {
    articles.findOne({link}).select(['title', 'content', 'createdAt']).populate({
        path: 'author',
        model: 'users',
        select: ['username']
    }).exec((err, article)=> {
        if(err||!article) callback(false)
        else callback(true, article)
    })
}

exports.create = function(body, userId, callback) {
    const {title, link, content} = body
    console.log(body)
    if(title && content && link && userId) {
        articles.create({title, link, content, author: userId}, (err, doc)=> {
            if(err) callback(false)
            else callback(true, doc)
        })
    } else callback(false)
}

