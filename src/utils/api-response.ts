import type { Response } from 'express';
import type { ApiErrorMeta, ApiResponse } from '../types/api-response.js';

const emptyData: Record<string, never> = {};

export const sendSuccess = <T>(
  response: Response<ApiResponse<T>>,
  status: number,
  data: T,
): void => {
  response.status(status).json({
    meta: {
      error: null,
      status,
    },
    data,
  });
};

export const sendError = (
  response: Response<ApiResponse<Record<string, never>>>,
  status: number,
  error: ApiErrorMeta,
): void => {
  response.status(status).json({
    meta: {
      error,
      status,
    },
    data: emptyData,
  });
};
