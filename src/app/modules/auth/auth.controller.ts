import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { authService } from './auth.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const result = await authService.loginUserFromDb(loginData);

  sendResponse(res, {
    success: true,
    message: 'User logged in successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const authController = {
  loginUser,
};
