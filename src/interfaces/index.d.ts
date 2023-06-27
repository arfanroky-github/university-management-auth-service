/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload | null;
    }
  }

  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      DEFAULT_STUDENT_PASSWORD: string;
      DEFAULT_FACULTY_PASS: string;
      DEFAULT_ADMIN_PASS: string;
      BCRYPT_SALT_ROUNDS: string;
      JWT_SECRET: string;
      JWT_EXPIRES_IN: string;
      JWT_REFRESH_SECRET: number;
      JWT_REFRESH_EXPIRES_IN: string;
    }
  }
}


