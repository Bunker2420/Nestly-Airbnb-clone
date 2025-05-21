const { required } = require('joi');
const mongoose = require('mongoose');
const { min, type } = require('../utils/Joilistingvalidation');
const Schema = mongoose.Schema;

const FeedBackSchema = new Schema({
    Author:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:10
    },
    Suggestion:{
        type:String,
        required:true
    },
    Feature:{
        type:String,
        required:true
    },
    Recommend:{
        type: String,
        enum: ['Yes', 'No'],
        default: null,
        required:true
    },
    reasonForPoorRating: {
        type: String,
        trim: true,
        default: '',
    },
    submittedAt:{
        type:Date,
        default:Date.now    
    }   
})

const FeedBack = new mongoose.model('FeedBack',FeedBackSchema);

module.exports = FeedBack;