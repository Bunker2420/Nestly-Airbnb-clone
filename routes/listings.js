const express = require('express');
const router =  express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const AppError = require('../utils/Express.js');
const ListingSchema = require('../utils/Joilistingvalidation.js');
const List = require('../Models/ListingSchema.js');
const { isLoggedIn, redirectURL, isOwner } = require('../Middleware/middleware.js');
const Controller = require('../Controllers/Listings');
const multer = require('multer');
const {storage} = require('../cloudConfig.js');
const { route } = require('./admin.js');
const upload = multer({ storage });
const FeedBack = require('../Models/FeedBackSchema.js');

router.get('/feedback',isLoggedIn,redirectURL,wrapAsync(async(req,res)=>{
    res.render('Admin/AdminFeedback.ejs')
}));

router.post('/feedback',wrapAsync(async(req,res)=>{
    let rating = req.body.rating;
    let Suggestion = req.body.Suggestion;
    let reasonForPoorRating = req.body.reasonForPoorRating;
    let Feature = req.body.Feature;
    let Recommend = req.body.Recommend;
    let store = await FeedBack.create({
        Author:req.user._id,
        rating:rating,
        Suggestion:Suggestion,
        Feature:Feature,
        Recommend:Recommend,
        reasonForPoorRating:reasonForPoorRating,
    })
    await store.save();
    console.log(store);
    req.flash('success',"Thankyou for your valuable feedback. You Successfully submitted the form");
    res.redirect('/listings');
}));

router.get('/',wrapAsync(Controller.index));

router.get('/new',isLoggedIn,wrapAsync(Controller.newListing));

const validateListing = (req, res, next) => {
    const { error } = ListingSchema.validate(req.body);
    if (error) {
        return res.status(400).render('error', { message: error.details[0].message, status: 400 });
    }
    next();
 }
router.post('/new',isLoggedIn,upload.single('image'),validateListing,wrapAsync(Controller.postnewListing));

// router.post('/new',upload.single('image'),async(req,res)=>{
//     res.send(req.file);
// })

const isListingExist = async (req, res, next) => {
    const { id } = req.params;
    const list = await List.findById(id);
    if (!list) {
        throw new AppError(404, "Listing you requested does not found or maybe deleted");
    }
    req.list = list; 
    next();
};

router.get('/:id/edit',isListingExist,isLoggedIn,isOwner,wrapAsync(Controller.editListing));

const ListingExist = async (req, res, next) => {
    const { id } = req.params;
    const list = await List.findById(id);
    if (!list) {
        throw new AppError(404, "Listing you requested does not found or may be deleted");
    }
    req.list = list;
    next();
};

router.post('/:id/edit',ListingExist,isLoggedIn,isOwner,upload.single('image'),wrapAsync(Controller.postEditListing));


const ListExisting = async(req,res,next)=>{
    let id = req.params.id;
    let list = await List.findById(id).populate("reviews").populate('owner').populate({
        path: 'reviews',
        populate: {
          path: 'author',
          model: 'User'
        }
      });
    console.log(list);
    if (!list) {
        throw new AppError(404,"Listing you requested does not found or may be deleted"); 
    }
    req.list = list;
    next();
};

router.get('/:id',ListExisting,wrapAsync(Controller.listpage));
// Delete route
router.delete('/:id',ListingExist,isLoggedIn,isOwner,wrapAsync(Controller.deleteListing));



module.exports = router;