const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId
const ArticleSchema = new Schema({
    title: String,
    content: String,
    author: ObjectId
}, {timestamps: true})

const articles = mongoose.model('articles', ArticleSchema)

exports.get = function(callback) {
    articles.find({}, (err, docs)=> {
        if(err) callback(false)
        else callback(true, docs)
    })
}

exports.create = function(body, userId, callback) {
    const {title, content} = body
    console.log(body)
    if(title && content && userId) {
        articles.create({title, content, author: userId}, (err, doc)=> {
            if(err) callback(false)
            else callback(true, doc)
        })
    } else callback(false)
}