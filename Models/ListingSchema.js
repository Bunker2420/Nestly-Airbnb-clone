const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./ReviewSchema');
const { type } = require('../utils/Joilistingvalidation');
const User = require('./UserSchema');

const ListingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: [100, "Maximum Length of the Title is 25 characters"]
    },
    description: {
        type: String,
        required: true
    },
    image: {
        url:String,
        filename:String,
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
});

ListingSchema.pre('findOneAndDelete',async()=>{
    console.log('Deleting the list and associated reviews');
});

ListingSchema.post("findOneAndDelete",async(list)=>{
    console.log(list);
    if(list.reviews.length)
    {
        let data = await Review.deleteMany({
            _id:{$in:list.reviews}         
        });
        console.log(data);
    }
});
const Listing = mongoose.model('Listing', ListingSchema);

module.exports = Listing;
