const User = require('../Models/UserSchema.js');

const SigningUp = async(req,res)=>{
    try
    {
        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.password; // extracting user information from form
        let store = new User({
            email:email,
            username:username,
            role:"User"
        });
        let user = await User.register(store,password); // storing it in database
        req.login(user,(err)=>{
            req.flash("success","Welcome to Nestly")
            console.log(user);
            res.redirect('/listings');
        });     
    }
    catch(err)
    {
        req.flash('error',err.message);
        res.redirect('/SignUp');
    }
}

const LoggingIn = async(req,res)=>{
    req.flash("success","Welcome to Nestly . You successfully logged in to your account");
    let redirected = res.locals.redirected || '/listings'
    res.redirect(redirected);
}

const LoggingOut = async(req,res,next)=>{
    req.logout((err)=>{
        if(err) {
           return next(err);
        }
        req.flash("success","You successfully logged out");
        res.redirect('/listings')
    });
}

module.exports = { SigningUp , LoggingIn , LoggingOut}