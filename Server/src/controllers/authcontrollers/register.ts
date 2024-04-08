// ../controllers/register.ts
import {  Request, Response } from "express";
import { User } from "../../models/userschema";
import bcrypt from "bcrypt";
require("dotenv").config();
import { Otp } from "../../models/otpSchema";
import { sendEmail } from "../../utils/nodemailer/nodemailer";
const saltRounds = 10;
// Controller to send OTP
export const sendOtp = async (
  req: Request,
  res: Response,
) => {
  const { name, email, password, dateOfBirth } = req.body;
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(200).json({
        // status code must 409  but its not working properly
        status: false,
        message: "User already exists",
      });
    }
    // Generate OTP
    const otp = Math.floor(Math.random() * 9000) + 1000;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Create a new user
    const newUser = await new User({
      name,
      email,
      password: hashedPassword,
      dateOfBirth,
    }).save();
    // Save OTP with expiration time (5 minutes)
    const otpExpiration = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
    await new Otp({
      userId: newUser._id,
      userOtp: otp,
      expiresAt: otpExpiration,
    }).save();

    // Send OTP via email
    await sendEmail(newUser.email, "Verify Email", otp.toString());

    res
      .status(201)
      .json({ status: true, message: "An OTP has been sent to your email" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "An error occurred while sending OTP" });
  }
};

// Controller to verify OTP and register user
export const register = async (req: Request, res: Response) => {
  try {
    const { email, OTP } = req.body;

    // Find the OTP record in the database using the provided OTP
    const otpRecord = await Otp.findOne({ userOtp: OTP });

    // Check if OTP record exists
    if (!otpRecord) {
      return res.status(400).json({
        status: false,
        message: "Invalid OTP",
      });
    }

    // Check if OTP has expired
    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({
        status: false,
        message: "OTP has expired",
      });
    }

    // Update user verification status
    await User.findOneAndUpdate({ email }, { isVerified: true });

    // Retrieve user details
    const user = await User.findOne({ email: email });

    // Send response indicating successful registration
    res.status(200).json({
      status: true,
      message: "User registered successfully",
      user: user, // You can send back the created user if needed
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({
      status: false,
      message: "An error occurred during registration",
    });
  }
};
