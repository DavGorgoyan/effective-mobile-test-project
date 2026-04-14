import { ZodError } from 'zod';
import type { NextFunction, Request, Response } from 'express';
import type { ApiErrorResponse } from '../types/index.js';

interface AppError extends Error {
  readonly statusCode?: number;
  readonly code?: string;
}

const errorHandler = (
  error: AppError,
  _req: Request,
  res: Response<ApiErrorResponse>,
  _next: NextFunction,
): void => {
  if (error instanceof ZodError) {
    res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'Request validation failed',
      details: error.issues,
    });
    return;
  }

  const statusCode: number = error.statusCode ?? 500;
  const errorCode: string = error.code ?? 'INTERNAL_ERROR';

  if (statusCode >= 500) {
    console.error(error);
  }

  res.status(statusCode).json({
    error: errorCode,
    message: error.message || 'An unexpected error occurred',
  });
};

export default errorHandler;
