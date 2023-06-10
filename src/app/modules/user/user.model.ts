import mongoose from 'mongoose';
import { IUser, UserModel } from './user.interface';


const userSchema = new mongoose.Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser, UserModel>('User', userSchema);

export default User;
