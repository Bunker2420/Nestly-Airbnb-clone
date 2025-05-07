const express = require('express');
const { route } = require('./user');
const router =  express.Router();

router.get('/help',(req,res)=>{
    res.render('Footerpages/help.ejs');
});

router.get('/aircover',(req,res)=>{
    res.render('Footerpages/aircover.ejs');
});

router.get('/antidiscrimination',(req,res)=>{
    res.render('Footerpages/antidiscrimination.ejs');
});

router.get('/cancellation',(req,res)=>{
    res.render('Footerpages/cancel.ejs');
});

router.get('/cancelconstruction',(req,res)=>{
    res.render('Footerpages/cancelsubpage.ejs');
});

router.get('/yourhome',(req,res)=>{
    res.render('Footerpages/Yourhome.ejs');
});

router.get('/hostsaircover',(req,res)=>{
    res.render('Footerpages/hostsaircover.ejs');
});

router.get('/communityforum',(req,res)=>{
    res.render('Footerpages/communityforum.ejs');
});

router.get('/cohost',(req,res)=>{
    res.render('Footerpages/cohost.ejs');
});

router.get('/newsroom',(req,res)=>{
    res.render('Footerpages/newsroom.ejs');
});

router.get('/careers',(req,res)=>{
    res.render('Footerpages/carrer.ejs');
});

router.get('/investors',(req,res)=>{
    res.render('Footerpages/investor.ejs');
});

router.get('/emergency',(req,res)=>{
    res.render('Footerpages/emergency.ejs');
});

router.get('/privacy',(req,res)=>{
    res.render('Footerpages/privacy.ejs');
});

router.get('/terms',(req,res)=>{
    res.render('Footerpages/terms.ejs');
});

router.get('/sitemap',(req,res)=>{
    res.render('Footerpages/sitemap.ejs');
});

router.get('/details',(req,res)=>{
    res.render('Footerpages/details.ejs');
})

module.exports = router;