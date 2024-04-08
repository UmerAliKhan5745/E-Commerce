import { NextFunction } from "express";
import { User } from "../../models/userschema";
import { Otp } from "../../models/otpSchema";
import bcrypt from "bcrypt";
import { sendEmail } from "../../utils/nodemailer/nodemailer";
const saltRounds = 10;
export const resetpasswordemailesend = async (req: any, res: any, next: NextFunction) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({  status:false,message: "User with the given email doesn't exist" });
    }

    const otp = Math.floor(Math.random() * 9000) + 1000;
    const otpExpiration = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
    await new Otp({
      userId: user._id,
      userOtp: otp,
      expiresAt: otpExpiration
    }).save();
    await sendEmail(user.email, "Verify Email", otp.toString());

   return res.status(200).json({ status:true ,message: "Please check your email for password reset instructions" });

  } catch (error) {
    console.error("An internal error occurred:", error);
    return res.status(500).json({status:false , message: "An internal error occurred" });
  }
};


export const resetpassword = async (req: any, res: any) => {
  try {
    const { email, password, OTP } = req.body;
    // Find the OTP record in the database using the provided OTP
    const otpRecord = await Otp.findOne({ userOtp: OTP });
    // Check if OTP record exists
    if (!otpRecord) {
      return res.status(400).json({
        status: false,
        message: 'Invalid OTP',
      });
    }

    // Check if OTP has expired
    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({
        status: false,
        message: 'OTP has expired',
      });
    }

    const newHashedPassword = await bcrypt.hash(password, saltRounds);
    // Update user verification status
    await User.findOneAndUpdate({ email:email }, { password: newHashedPassword });
    // Delete OTP record
    await Otp.deleteOne({ userOtp:OTP});
    
    // Send response indicating successful password reset
  return  res.status(200).json({
      status: true,
      message: 'User password changed successfully',
    });
  } catch (error) {
    console.error('Error during password reset:', error);
    res.status(500).json({
      status: true,
      message: 'An error occurred during password reset',
    });
  }
};
