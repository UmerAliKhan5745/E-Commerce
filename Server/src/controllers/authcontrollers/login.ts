// ../controllers/register.ts
import { Request, Response } from "express";
import { User } from "../../models/userschema";
import bcrypt from "bcrypt";
const jwt = require('jsonwebtoken');
require("dotenv").config();
export const Login = async (req: Request, res: Response) => {
  let { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }
    if(user.isVerified) {
    const hashpassword: any = user.password;
    const checkpassword = await bcrypt.compare(password, hashpassword);
    const payload = {
      id: user.id,
      email: user.email,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 3600,
  });
  if (checkpassword) {
      return res
        .status(200)
        .json({ status: true, message: "Login Successfully",token:"bearer " + token   });       
    } else {
       res
      .status(401)
      .json({
        status: false,
        message: "Try to login with correct credentials"
      });
    }
   }}catch (err: any) {
    res.status(500).json({
      status: "failed",
      message: "An error occurred during login",
    });
  }
};
