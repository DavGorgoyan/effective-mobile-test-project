import { ERROR_CODE } from '../constants/error-codes.js';
import { AppException } from './app.exception.js';

export class UserNotFoundException extends AppException {
  constructor() {
    super(404, 'User not found', ERROR_CODE.USER.NOT_FOUND);
  }
}

export class UserAccessDeniedException extends AppException {
  constructor() {
    super(403, 'Access denied', ERROR_CODE.USER.ACCESS_DENIED);
  }
}

export class CannotBlockUserException extends AppException {
  constructor() {
    super(403, 'Cannot block this user', ERROR_CODE.USER.CANNOT_BLOCK_USER);
  }
}

export class InvalidUserRouteParamException extends AppException {
  constructor() {
    super(400, 'Invalid route parameter', ERROR_CODE.USER.INVALID_ROUTE_PARAM);
  }
}
