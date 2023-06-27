/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable no-unused-vars */
import mongoose, { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';
import { IFaculty } from '../faculty/faculty.interface';
import { IAdmin } from '../admin/admin.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  need_password_change: boolean;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  admin?: Types.ObjectId | IAdmin;
};

// export interface IUserMethods {
//   isPasswordMatched(
//     givenPassword: string,
//     savedPassword: string
//   ): Promise<boolean>;
//   isUserExist(
//     id: string
//   ): Promise<Pick<IUser, 'id' | 'need_password_change' | 'password'> | null>;
// }

export type UserDocument = {
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;

  isUserExist(
    id: string
  ): Promise<Pick<IUser, 'id' | 'need_password_change' | 'password' | 'role'> | null>;
} & Model<IUser>;




// export type UserModel = mongoose.Model<
//   IUser,
//   Record<string, unknown>,
//   IUserMethods
// >;
