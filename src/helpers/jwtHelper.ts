import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

type PayloadProps = {
  id: string;
  role: string;
};

const createToken = (
  payload: PayloadProps,
  secret: Secret,
  expiresTime: string
) => {
  return jwt.sign(payload, secret, { expiresIn: expiresTime });
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelper = {
  createToken,
  verifyToken,
};
