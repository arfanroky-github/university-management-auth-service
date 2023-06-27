import jwt, { Secret } from 'jsonwebtoken';

type PayloadProps = {
  id: string;
  role: string;
};

const createToken = (
  payload: PayloadProps,
  secrect: Secret,
  expiresTime: string
) => {
  return jwt.sign(payload, secrect, { expiresIn: expiresTime });
};
export default createToken;
