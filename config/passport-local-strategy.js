const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true, // allows to set first argument as req
  }, async function (req, email, password, done) {
    try {
      const user = await User.findOne({ email: email }).exec();
  
      if (!user) {
        req.flash('error', 'Invalid username or password');
        return done(null, false);
      }
  
      const isPasswordCorrect = await user.comparePassword(password);
  
      if (!isPasswordCorrect) {
        req.flash('error', 'Invalid username or password');
        return done(null, false);
      }
  
      return done(null, user);
    } catch (err) {
      req.flash('error', err);
      return done(err);
    }
  }));
  
passport.serializeUser((user, done) => {
    done(null,user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
    .then((user) => {
        return done(null , user);
    })
    .catch(err => {
        console.log("Error in finding user  --- >  Passport");
        return done(err);
    });
});

// check is the user is already authenticated
passport.checkAuthentication = (req, res, next) => {
    // if the user is already authenticated then pass the next function
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not authenticated
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = (req, res, next) => {
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;