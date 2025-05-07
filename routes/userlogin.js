const express = require('express');
const router = express.Router();
const User = require('../Models/UserSchema.js')
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');
const { isLoggedIn, redirectURL } = require('../Middleware/middleware.js');
const AppError = require('../utils/Express.js');
const Controller = require('../Controllers/Users');

router.get('/',(req,res)=>{
    res.render('Users/Login.ejs');
});

router.post('/',redirectURL,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true})
          ,wrapAsync(Controller.LoggingIn));  

module.exports = router;