import { Response } from 'express';

type ApiResponseType<T> = {
  success: boolean;
  message?: string | null;
  data?: T;
  statusCode: number;
};

const sendResponse = <T>(
  res: Response,
  data: ApiResponseType<T>): void => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message || null,
    data: data.data || null,
  });
};

export default sendResponse;
