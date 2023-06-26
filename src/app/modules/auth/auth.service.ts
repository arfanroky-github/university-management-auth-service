import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import User from '../user/user.model';
import { LoginResultType, LoginType } from './auth.interface';

async function loginUserFromDb(
  payload: LoginType
): Promise<LoginResultType | null> {
  const { id, password } = payload;

  // check user exist
  const user = new User();
  const isUserExist = await user.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // mathed password
  const isPasswordCorrect = await user.isPasswordMatched(
    password,
    isUserExist.password as string
  );
  if (!isPasswordCorrect) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password');
  }

  // create access token
  return {
    access_token: '',
    refresh_token: '',
    needs_password_change: user.need_password_change,
  };
}

export const authService = {
  loginUserFromDb,
};
