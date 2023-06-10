import mongoose from 'mongoose';
import { GenericErrorMessage } from '../interfaces/error';
import { GeenricErrorResponse } from '../interfaces/common';

const handleValidationError = (
  error: mongoose.Error.ValidationError
): GeenricErrorResponse => {
  const errors: GenericErrorMessage[] = Object.values(error.errors).map(el => {
    return {
      path: el.path,
      message: el.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleValidationError;
