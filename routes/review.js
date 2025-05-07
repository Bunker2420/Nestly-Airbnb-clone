const express = require('express');
const router = express.Router({mergeParams:true});
const wrapAsync = require('../utils/wrapAsync.js');
const AppError = require('../utils/Express.js');
const List = require('../Models/ListingSchema.js');
const storereview = require('../Models/ReviewSchema.js');
const{validReview, isLoggedIn} = require('../Middleware/middleware.js')
const Controller = require('../Controllers/Review.js')



router.post('/',isLoggedIn,validReview,wrapAsync(Controller.postReview));

// DELETE REVIEW
router.delete("/:reviewId",isLoggedIn,wrapAsync(Controller.deleteReview));

module.exports = router;
