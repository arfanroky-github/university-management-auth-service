/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { IUser, UserDocument } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';

const userSchema = new Schema<IUser, UserDocument>(
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
      select: 0,
    },
    need_password_change: {
      type: Boolean,
      default: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

// userSchema.methods.isUserExist = async function (
//   id: string
// ): Promise<Pick<IUser, 'id' | 'need_password_change' | 'password'> | null> {
//   return await User.findOne(
//     { id },
//     { id: 1, password: 1, need_password_change: 1 }
//   );
// };

// userSchema.methods.isPasswordMatched = async function (
//   givenPassword: string,
//   savedPassword: string
// ): Promise<boolean> {
//   return await bcrypt.compare(givenPassword, savedPassword);
// };

userSchema.static(
  'isPasswordMatched',
  async function (
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(givenPassword, savedPassword);
  }
);

userSchema.static('isUserExist', async function (id: string): Promise<Pick<
  IUser,
  'id' | 'password' | 'need_password_change' | 'role'
> | null> {
  return await User.findOne(
    { id },
    { id: 1, password: 1, role: 1, need_password_change: 1 }
  );
});

const User = model<IUser, UserDocument>('User', userSchema);
export default User;
