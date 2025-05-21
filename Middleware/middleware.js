const {ReviewSchema} = require('../utils/JoiReviewsvalidation.js');

const isLoggedIn = async(req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash('error', 'You must be logged in to access this page.');
        return res.redirect('/login');
    }
    next(); // If authenticated, continue to the next middleware or route handler
};

const redirectURL = async(req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirected = req.session.redirectUrl;
    }
    next();
};

const validReview = (req, res, next) => {
    const { error } = ReviewSchema.validate(req.body);
    if (error) {
         throw new AppError(400,error.details[0].message)
    }
    next();
}

const isOwner = (req, res, next) => {
    const listing = req.list; // req.list should have been set by a previous middlewar
    if (!listing.owner.equals(res.locals.currUser._id)) {
        req.flash('error', 'You are not authorized to edit this listing');
        return res.redirect(`/listings/${listing._id}`);
    }

    next();
};

function isAdminLoggedIn(req, res, next) {
    if (req.isAuthenticated() && req.user instanceof Admin) {
        return next();
    }
    req.flash('error', 'You must be logged in as an Admin');
    res.redirect('/admin/login');
}


module.exports = { isLoggedIn, redirectURL, validReview ,isOwner , isAdminLoggedIn};
