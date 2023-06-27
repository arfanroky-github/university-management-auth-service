import { NextFunction, Request, Response } from 'express';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';
import { jwtHelper } from '../../helpers/jwtHelper';
import config from '../../config';
import { Secret } from 'jsonwebtoken';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers['authorization'];
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }
      // verify token
      let verifiedUser = null;
      verifiedUser = jwtHelper.verifyToken(token, config.jwt.secret as Secret);

      if (!verifiedUser) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Invalid token');
      }
      req.user = verifiedUser; // role , userid

      // guard by role
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden!');
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
