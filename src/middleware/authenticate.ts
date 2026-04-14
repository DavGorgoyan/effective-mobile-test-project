import type { NextFunction, Request, Response } from 'express';
import {
  MissingBearerTokenException,
  UnauthorizedException,
} from '../exceptions/auth.exception.js';
import userRepository from '../repositories/user-repository.js';
import authService from '../services/auth-service.js';

const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  const header = req.header('authorization');

  if (!header?.startsWith('Bearer ')) {
    throw new MissingBearerTokenException();
  }

  const token: string = header.replace('Bearer ', '');
  const payload = authService.verifyAccessToken(token);
  const user = await userRepository.findById(payload.sub);

  if (!user || !user.isActive) {
    throw new UnauthorizedException();
  }

  req.authUser = {
    id: user.id,
    role: user.role,
  };

  next();
};

export default authenticate;
