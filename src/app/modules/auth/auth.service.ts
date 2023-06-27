import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import User from '../user/user.model';
import {
  LoginResultType,
  LoginType,
  RefreshTokenResponse,
} from './auth.interface';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelper } from '../../../helpers/jwtHelper';

async function loginUserFromDb(
  payload: LoginType
): Promise<LoginResultType> {
  const { id: givenId, password: givenPassword } = payload;

  // check user exist from User.static method
  const isUserExist = await User.isUserExist(givenId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  const {
    id: savedId,
    password: savedPassword,
    role,
    need_password_change,
  } = isUserExist;
  //  check password correct from User.static method
  const isPasswordCorrect = await User.isPasswordMatched(
    givenPassword,
    savedPassword
  );
  if (!isPasswordCorrect) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password');
  }

  const accessToken = jwtHelper.createToken(
    { id: savedId, role: role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelper.createToken(
    { id: savedId, role: role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
    needsPasswordChange: need_password_change,
  };
}

async function refreshTokenFromDb(
  token: string
): Promise<RefreshTokenResponse> {
  let verifiedToken = null;

  // verify token
  try {
    verifiedToken = jwtHelper.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid token');
  }

  // checking deleted user refresh token
  const { userId } = verifiedToken as { userId: string };
  const isUserExist = await User.isUserExist(userId);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!');
  }

  // generate new access token
  const newAccessToken = jwtHelper.createToken(
    { id: isUserExist.id, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
}

export const authService = {
  loginUserFromDb,
  refreshTokenFromDb,
};
