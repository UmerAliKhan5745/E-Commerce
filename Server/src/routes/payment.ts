// Import necessary modules and middleware
import express from "express";
const router = express.Router();
import {paymentbystripe} from "../controllers/paymentmethod/stripe";

// Route for accessing protected resources, requires authentication
router.post('/create-payment-intent',  paymentbystripe);


module.exports = router;
