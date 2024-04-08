// Import required modules
import passport from 'passport';
// import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
import { User } from "../../models/userschema";
// Configure Google OAuth strategy
passport.use(new GoogleStrategy({
 // Adjust the port accordingly
},
async (accessToken:any, refreshToken:any, profile:any, done:any) => {
  console.log(accessToken)
  // Extract user email from Google profile
  const email = profile.emails[0].value;
  const name = profile.displayName;

  // Check if user already exists in database
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return done(null, existingUser);
  }
  // Save user email to database
  const newUser = new User({
    email: email,
    name: name,
    isVerified: true
  });
  await newUser.save();
  done(null, newUser);
  
}));

passport.serializeUser(function (user:any, cb:any) {
  cb(null, user);
});

passport.deserializeUser(function (obj:any, cb:any) {
  cb(null, obj);
});





// Start server

