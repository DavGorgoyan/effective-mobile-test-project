import { ERROR_CODE } from "../constants/error-codes.js";
import { AppException } from "./app.exception.js";

export class EmailAlreadyExistsException extends AppException {
  constructor() {
    super(409, "Email already exists", ERROR_CODE.AUTH.EMAIL_ALREADY_EXISTS);
  }
}

export class UserBlockedException extends AppException {
  constructor() {
    super(401, "User is blocked", ERROR_CODE.AUTH.USER_BLOCKED);
  }
}

export class InvalidTokenException extends AppException {
  constructor() {
    super(401, "Invalid token", ERROR_CODE.AUTH.INVALID_TOKEN);
  }
}

export class MissingBearerTokenException extends AppException {
  constructor() {
    super(401, "Missing bearer token", ERROR_CODE.AUTH.MISSING_BEARER_TOKEN);
  }
}

export class UnauthorizedException extends AppException {
  constructor() {
    super(401, "Unauthorized", ERROR_CODE.AUTH.UNAUTHORIZED);
  }
}

export class PasswordIsNotCorrectException extends AppException {
  constructor() {
    super(
      401,
      "Password is not correct",
      ERROR_CODE.AUTH.PASSWORD_IS_NOT_CORRECT,
    );
  }
}
