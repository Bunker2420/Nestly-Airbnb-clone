const express = require('express');
const router = express.Router();
const User = require('../Models/UserSchema.js')
const path = require('path');
const wrapAsync = require('../utils/wrapAsync.js');
const Controller = require('../Controllers/Users.js')

router.get('/',(req,res)=>{
    res.render('Users/SignUp.ejs'); 
});

router.post('/',wrapAsync(Controller.SigningUp));

module.exports = router;