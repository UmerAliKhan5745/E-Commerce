import mongoose, { Document } from "mongoose";

interface IToken extends Document {
    userId: mongoose.Types.ObjectId;
    userOtp: string;
    createdAt: Date;
    expiresAt:Date
}

const otpSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    userOtp: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        default: Date.now,
        expiresAt: 60*5
    },
});

export const Otp = mongoose.model<IToken>('Otp', otpSchema);
