import { UserService } from './user.service';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req.body;
  const result = await UserService.createUserToDb(user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User created successfully',
    data: result,
  });
  next()
});

export const UserController = {
  createUser,
};
