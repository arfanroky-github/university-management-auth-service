import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { UserService } from './user.service';

const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { student, ...userData } = req.body;
    const result = await UserService.createStudentToDb(student, userData);

    sendResponse<IUser | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully!',
      data: result,
    });
  }
);

const createFaculy: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { faculty, ...userData } = req.body;
    const result = await UserService.createFacultyToDb(faculty, userData);

    sendResponse<IUser | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully!',
      data: result,
    });
  }
);

const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { admin, ...userData } = req.body;
    const result = await UserService.createAdminToDb(admin, userData);

    sendResponse<IUser | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin created successfully!',
      data: result,
    });
  }
);

const getAllUsers: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserService.getAllUsersFromDb();

    sendResponse<IUser[] | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  }
);

export const UserController = {
  createStudent,
  createFaculy,
  createAdmin,
  getAllUsers,
};
