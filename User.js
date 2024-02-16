const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    course: String,
    year_level: Number,
    address: String,
    contact: Number
        
})

const UserModel = mongoose.model("users", UserSchema)

module.exports = UserModel;