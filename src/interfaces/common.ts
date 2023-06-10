import { GenericErrorMessage } from './error';

export type GeenricErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: GenericErrorMessage[];
};
