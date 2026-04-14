import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import {
  AppException,
  InternalServerException,
  ValidationException,
} from '../exceptions/app.exception.js';
import { sendError } from '../utils/api-response.js';

const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (error instanceof ZodError) {
    const validationError = new ValidationException(error.issues);

    sendError(res, validationError.statusCode, {
      code: validationError.code,
      message: validationError.message,
      details: validationError.details,
    });
    return;
  }

  if (error instanceof AppException) {
    sendError(res, error.statusCode, {
      code: error.code,
      message: error.message,
      details: error.details,
    });
    return;
  }

  console.error(error);

  const internalError = new InternalServerException();
  sendError(res, internalError.statusCode, {
    code: internalError.code,
    message: internalError.message,
  });
};

export default errorHandler;
