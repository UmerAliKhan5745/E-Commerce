import mongoose, { Document, Schema } from 'mongoose';

interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  isVerified: boolean;
}

const userSchema = new Schema<UserDocument>({
  name: {type:String,trim:true},
  email: { type: String, index: true, unique: true,trim:true },
  password: String,
  dateOfBirth: Date,
  isVerified: { type: Boolean, default: false },
});

export const User = mongoose.model<UserDocument>('User', userSchema);
