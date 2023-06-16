import mongoose from 'mongoose';
import { GeenricErrorResponse } from '../interfaces/common';
import { GenericErrorMessage } from '../interfaces/error';

const handleCastError = (error: mongoose.Error.CastError): GeenricErrorResponse => {
  const errors: GenericErrorMessage[] = [
    {
      path: error.path,
      message: error.message,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Cast Error',
    errorMessages: errors,
  };
};

export default handleCastError;
