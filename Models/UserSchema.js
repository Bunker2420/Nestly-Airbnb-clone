const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const { type } = require('../utils/Joilistingvalidation');

const userSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'user'
    }
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User',userSchema);

module.exports = User;