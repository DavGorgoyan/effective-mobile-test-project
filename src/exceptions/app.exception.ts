import { ERROR_CODE } from '../constants/error-codes.js';

export class AppException extends Error {
  public readonly statusCode: number;
  public readonly code: number;
  public readonly details?: unknown;

  constructor(statusCode: number, message: string, code: number, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

export class ValidationException extends AppException {
  constructor(details?: unknown) {
    super(400, 'Request validation failed', ERROR_CODE.SYSTEM.VALIDATION_ERROR, details);
  }
}

export class RouteNotFoundException extends AppException {
  constructor(route: string) {
    super(404, `Route not found: ${route}`, ERROR_CODE.SYSTEM.ROUTE_NOT_FOUND);
  }
}

export class InternalServerException extends AppException {
  constructor() {
    super(500, 'An unexpected error occurred', ERROR_CODE.SYSTEM.INTERNAL_ERROR);
  }
}

export class ConfigException extends AppException {
  constructor(key: string) {
    super(500, `Missing required environment variable: ${key}`, ERROR_CODE.SYSTEM.CONFIG_ERROR);
  }
}
