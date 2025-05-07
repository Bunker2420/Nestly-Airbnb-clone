const List = require('../Models/ListingSchema.js');
const storereview = require('../Models/ReviewSchema.js');

const postReview = async(req,res)=>{
    let id = req.params.id;
    let rating = req.body.rating;
    let comment = req.body.comments;
    let listings = await List.findById(id);
    if(!listings)
    {
        throw new AppError(404,"Listing not found");
    }
    let reviews = await storereview.create({
        rating:Number(rating),
        comments:comment,
        author:res.locals.currUser._id
    });
    await listings.reviews.push(reviews);
    let ans = await reviews.save();
    let ans2 = await listings.save();
    req.flash("success","Succesfully uploaded review");
    console.log("review saved ",ans,ans2);
    res.redirect(`/listings/${id}`);
}

const deleteReview = async (req, res) => {
    let { id, reviewId } = req.params;
    let review = await storereview.findById(reviewId);
    if (!review) {
        throw new AppError(404, "Review not found");
    }
    if(res.locals.currUser._id.equals(review.author._id)){
         // deleting from listing collection
        let del = await List.findByIdAndUpdate(id, { $pull: { reviews: { _id: reviewId } } });
        // deleting from review collection
        let rdel = await storereview.findByIdAndDelete(reviewId);   
        req.flash('success',"Successfully deleted review");
        return res.redirect(`/listings/${id}`);
    }
    req.flash("error","You are not the owner of the review . You dont have permission to delete this review");
    return res.redirect(`/listings/${id}`);
}

module.exports = { postReview , deleteReview }