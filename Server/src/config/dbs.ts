import mongoose from "mongoose";
require('dotenv').config();

// const url = process.env.MONGODB;
const connectToDatabase = async () => {
  try {
    const client = await mongoose.connect('mongodb://localhost:27017/e-commerce');

    if (client) {
      console.log("Connected to MongoDB");
    } else {
      console.log("Failed to connect to MongoDB");
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

connectToDatabase();
