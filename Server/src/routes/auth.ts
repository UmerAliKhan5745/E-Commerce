// Import necessary modules and middleware
import express from "express";
import passport from "passport";
const router = express.Router();
import { register, sendOtp } from "../controllers/authcontrollers/register";
import { Login } from "../controllers/authcontrollers/login";
import { validationsMiddleware } from '../validation/validation'
import { getUserInfo } from "../controllers/authcontrollers/getdata";
import { resetpasswordemailesend } from "../controllers/authcontrollers/resetpassword";
import { resetpassword } from "../controllers/authcontrollers/resetpassword";
import { Protected } from "../controllers/authcontrollers/protected";

// Route for accessing protected resources, requires authentication
router.post('/protected', passport.authenticate('jwt', { session: false }), Protected);

// Route for getting user data, requires authentication
router.post("/getdata", passport.authenticate('jwt', { session: false }), getUserInfo);

// Route for sending OTP for registration
router.post("/sendOtp", validationsMiddleware, sendOtp);

// Route for user registration
router.post("/register", validationsMiddleware, register);

// Route for user login
router.post("/login", validationsMiddleware, Login);

// Route for sending reset password email
router.post('/resetpasswordemailesend', validationsMiddleware, resetpasswordemailesend);

// Route for resetting password
router.post('/resetpassword', validationsMiddleware, resetpassword);

// Export the router

// GoogleAuth password Endpoints
// Define routes
router.get("/google",passport.authenticate("google", { scope: ["profile", "email"] }));


 router.get('/google/callback',passport.authenticate('google', { failureRedirect: '/pages/auth/login' }),
  (req, res) => {res.redirect('/');});

module.exports = router;
