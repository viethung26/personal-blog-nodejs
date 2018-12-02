const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: String,
    password: String,
    fullname: String,
    role: String
}, {timestamps: true})

const users = mongoose.model('users', UserSchema)

exports.signup = function(newUser, callback) {
    const {username, password, fullname} = newUser
    if(username && password && fullname) {
        users.create({username, password, fullname}, (err, doc)=> {
            console.log(doc)
            if(err) callback(false)
            else callback(true)
        })
    } else callback(false)
}
exports.signin = function (user, callback) {
    users.findOne({username: user.username, password: user.password},['username'],  (err, doc)=> {
        if(err||!doc) callback(false)
        else callback(true, doc)
    })
}
exports.findById = function(userId, callback) {
    users.findById(userId, (err, user)=> {
        if(err) callback(false)
        else callback(true, user)
    })
}