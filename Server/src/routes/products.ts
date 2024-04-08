// Import necessary modules and middleware
import express from "express";
import passport from "passport";
const router = express.Router();
import { getUserInfo } from "../controllers/authcontrollers/getdata";
import { Protected } from "../controllers/authcontrollers/protected";
import { Tshirts, mug, hoodie, sticker } from "../controllers/productcontrollers/products";

// Route for accessing protected resources, requires authentication
router.post('/protected', passport.authenticate('jwt', { session: false }), Protected);

// Route for getting user data, requires authentication
router.post("/getdata", passport.authenticate('jwt', { session: false }), getUserInfo);

// Routes for Tshirts
router.get("/tshirts", Tshirts); // Route for fetching Tshirts data
router.get("/tshirtsdetails/:id", Tshirts); // Route for fetching Tshirts datadetails
router.post("/tshirts", Tshirts); // Route for adding Tshirts data

// Routes for Mug
router.get("/mug", mug); // Route for fetching Mug data
router.get("/mugdetails/:id", mug); // Route for fetching Tshirts datadetails
router.post("/mug", mug); // Route for adding Mug data

// Routes for Hoodie
router.get("/hoodie", hoodie); // Route for fetching Hoodie data
router.get("/hoodiedetails/:id", hoodie); // Route for fetching Tshirts datadetails
router.post("/hoodie", hoodie); // Route for adding Hoodie data

// Routes for Sticker
router.get("/sticker", sticker); // Route for fetching Sticker data
router.get("/stickerdetails/:id", sticker); // Route for fetching Tshirts datadetails
router.post("/sticker", sticker); // Route for adding Sticker data

// Export the router
module.exports = router;
