const express = require('express');
const router =  express.Router();
const Admin = require('../Models/AdminSchema.js');
const passport = require('passport');
const { redirectURL,isAdminLoggedIn } = require('../Middleware/middleware.js');
const wrapAsync = require('../utils/wrapAsync.js');
const FeedBack = require('../Models/FeedBackSchema.js');

// router.get('/SignUp',async (req,res)=>{
//      try{
//         let username = 'Ruthwick';
//         let password = 'Ruthwick@#24';
//         let store = new Admin({
//             username:username
//         })
//         let newadmin = await Admin.register(store,password);
//         console.log(newadmin);
//         res.send('Admin data stored');
//      }
//      catch(err){
//         console.log('Error in storing',err);
//      }
// });

router.get('/login',async(req,res)=>{
    res.render('Admin/AdminForm.ejs');
    const admins = await Admin.find({});
    console.log(admins);
});

router.post('/login',passport.authenticate('admin-local',{failureRedirect:'/admin/login',failureFlash:true}),wrapAsync(async(req,res)=>{
    try
    {
        const feedbacks = await FeedBack.find({}).populate('Author');
        req.flash('success','Welcome Admin');
        res.render('Admin/adminpage.ejs',{feedbacks,admin: req.user})
    }
    catch(err){
        console.log(err);
    }
    }));

router.get('/logout',wrapAsync(async(req,res,next)=>{
    req.logout((err)=>{
        if(err)
        {
            return next(err);
        }
        req.flash("success","Successfully logged out");
        res.redirect('/admin/login');
    })
}));

router.get('/feedback-delete',wrapAsync(async(req,res,next)=>{
    
}))

module.exports = router;