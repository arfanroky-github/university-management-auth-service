import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { authService } from './auth.service';
import config from '../../../config';
import { LoginResultType, RefreshTokenResponse } from './auth.interface';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const result = await authService.loginUserFromDb(loginData);
  const { refreshToken, ...others } = result as LoginResultType;

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<Omit<LoginResultType, 'refreshToken'>>(res, {
    success: true,
    message: 'User logged in successfully',
    statusCode: httpStatus.OK,
    data: others,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken: requestRefreshToken } = req.cookies;

  const result = await authService.refreshTokenFromDb(requestRefreshToken);

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', requestRefreshToken, cookieOptions);

  sendResponse<RefreshTokenResponse>(res, {
    success: true,
    message: 'Refresh token successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const authController = {
  loginUser,
  refreshToken,
};
