const mongoose = require('mongoose');
const User = require('./UserSchema');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comments:{
        type:String,
        required:true,
        maxLength:[100,"Maximum length of comments is 100"]
    },
    rating:{
        type:Number,
        required:true,
        min:0,
        max:5,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    author:
    {
        type:Schema.Types.ObjectId,
        ref:"User"
    }
});

const Review = new mongoose.model("Review",reviewSchema);

module.exports = Review;