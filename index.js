
if(process.env.NODE_ENV != "production")
{
    require('dotenv').config();
}
console.log(process.env.SECRET);
// Accessing the environment variables stored in env file..
// only in development phase ... in production we will see another method..

const express = require('express');
const app = express();
const path = require('path'); 
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const  LocalStrategy = require('passport-local');
const User = require('./Models/UserSchema.js');
const Controller = require('./Controllers/Users.js');
const Admin = require('./Models/AdminSchema');
console.log('Admin model:', Admin);


app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); 

const MONGO_URL = process.env.ATLAS_DB_URL;

const store = MongoStore.create({
    mongoUrl: MONGO_URL,
    crypto:{
        secret:process.env.SECRET
    },
    touchAfter: 24 * 3600
  });

store.on("error",()=>{
    console.log('Error in mongo session store',err);
});

const sessionObject = {
   store:store,
   secret:process.env.SECRET,
   resave:false,
   saveUninitialized:true, 
   name:"sessionid",
   cookie:{
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly:true
   }
}


app.use(session(sessionObject));
app.use(flash());

app.engine('ejs', ejsMate); 
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');



async function main() {
    try{
        await mongoose.connect(MONGO_URL);
        console.log('✅ MongoDB Connection Successful'); 
    }
    catch(err)
    {
        console.log('❌ MongoDB Connection Failed:', err.message)
    }
}
main();

//  Initializing the passport
app.use(passport.initialize());
// Integrating the passport with session to store the user
app.use(passport.session());
// IMPLEMENTING THE LOCAL STRATEGY
passport.use('user-local', new LocalStrategy(User.authenticate()));
// Admin Strategy
passport.use('admin-local', new LocalStrategy({
    usernameField: 'username'
}, Admin.authenticate()));

// Serializing and deserializing the users
passport.serializeUser((user, done) => {
    console.log('SERIALIZE:', user); // 👈 Check what's actually coming in
    const role = user.role;
    if (!role) {
        console.log('Role is missing!');
    }
    done(null, { id: user.id, type: role === 'admin' ? 'Admin' : 'User' });
});


passport.deserializeUser(async (obj, done) => {
    console.log('DESERIALIZE:', obj); // 👈 See what's stored in session
    try {
        if (obj.type === 'Admin') {
            const admin = await Admin.findById(obj.id);
            console.log('ADMIN FOUND:', admin); // 👈 This should not be undefined
            done(null, admin);
        } else {
            const user = await User.findById(obj.id);
            console.log('USER FOUND:', user);
            done(null, user);
        }
    } catch (err) {
        console.error('ERROR in deserialize:', err);
        done(err, null);
    }
});



// Passport setup is completed with express

// Leaning how passport stores the user information what methods are used.....
// app.get('/demouser',async(req,res)=>{
//     let fakeUser = new User({
//         email:"ruthwick24@gmail.com",
//         username:"Bunker" // username field is given by moongoose we did not defined in schema....
//     });
//     let registeredUser =  await User.register(fakeUser,"Bunker@24"); // we also stored password . so register method takes two inputs userinformation and password
//     console.log(registeredUser);
//     res.send(registeredUser);
// });


// adding owner feature and data to our page
// app.get('/InsertDocumentTesting', async (req, res) => {
//     try {
//         await List.deleteMany({});
//         const dataWithOwner = initData.map(obj => ({ ...obj, owner: "68131a2e9fa8c8accc8c5c20" }));
//         const list = await List.insertMany(dataWithOwner);
//         console.log(list);
//         res.send('Huge data is inserted');
//     } catch (error) {
//         console.error('Error inserting documents:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });


// flash middleware
app.use((req,res,next)=>{
    // success 
    res.locals.success_msg = req.flash('success');
    // error
    res.locals.error_msg = req.flash('error');
    res.locals.currUser = req.user;
    console.log(res.locals.currUser);
    next();
});



app.get('/',(req,res)=>{
    res.redirect('/listings')
});

const adminRoute = require('./routes/admin.js')
app.use('/admin',adminRoute)

// useed express.router for user page
const userroute = require('./routes/user.js');
app.use('/SignUp',userroute);

// used express router for login
const loginroute = require('./routes/userlogin.js');
app.use('/login',loginroute);

// used express.router()
const listingroute = require('./routes/listings.js');
app.use('/listings',listingroute);

//Review post route
const reviewRoute = require('./routes/review.js');
app.use('/listings/:id/reviews',reviewRoute);

// footer pages route
const footerpagesroute = require('./routes/footerpages.js');
const wrapAsync = require('./utils/wrapAsync.js');
const AppError = require('./utils/Express.js');
app.use('/',footerpagesroute);

app.get('/logout',wrapAsync(Controller.LoggingOut));




app.use((err,req,res,next)=>{
    let {status = 500 , message = "Error internal server error"} = err;
    res.status(status).render('error', { status, message }); 
});



app.listen(3000,()=>{
    console.log('Server is running at port 3000');
});