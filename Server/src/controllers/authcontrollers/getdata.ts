import { User } from "../../models/userschema";
import express, { Request, Response } from "express";
export const getUserInfo = async (req: any, res: Response) => {
  try {
    const decodedUser = req.user._id;
    // Assuming your User model has a method to find a user by ID
    const user = await User.findById({_id: decodedUser });
    if (user) {
      // Send user information in the response
      res.status(200).json({
        status: true,
        message: "User information retrieved successfully",
        user: user, // Assuming you want to send the user's ID in the response
      });
    } else {
      res.status(404).json({
        status: false,
        message: "User not found",
      });
    }
  } catch (error: any) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({
      status: false,
      message: "An error occurred while retrieving user information",
      error: error.message,
    });
  }
};
