import mongoose from "mongoose";

export type IUser = {
  id: string;
  role: string;
  password: string;
};

export type UserModel = mongoose.Model<IUser, Record<string, unknown>>;
