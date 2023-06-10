import { ZodError } from 'zod';
import { GeenricErrorResponse } from '../interfaces/common';

const handleZodError = (error: ZodError): GeenricErrorResponse => {
  const errors = error.issues.map(issue => ({
    path: issue.path.join('.'),
    message: issue.message,
  }));

  return {
    statusCode: 400,
    message: 'Bad Request',
    errorMessages: errors,
  };
};

export default handleZodError;
