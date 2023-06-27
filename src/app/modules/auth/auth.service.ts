import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import User from '../user/user.model';
import { LoginResultType, LoginType } from './auth.interface';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import createToken from '../../../helpers/jwtHelper';

async function loginUserFromDb(
  payload: LoginType
): Promise<LoginResultType | null> {
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

  const accessToken = createToken(
    { id: savedId, role: role },
    config.jwt.secrect as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = createToken(
    { id: savedId, role: role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    access_token: accessToken,
    refresh_token: refreshToken,
    needs_password_change: need_password_change,
  };
}

export const authService = {
  loginUserFromDb,
};
