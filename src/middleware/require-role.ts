import type { UserRole } from '@prisma/client';
import type { NextFunction, Request, Response } from 'express';
import { UnauthorizedException } from '../exceptions/auth.exception.js';
import { UserAccessDeniedException } from '../exceptions/user.exception.js';

const requireRole = (role: UserRole) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.authUser) {
      throw new UnauthorizedException();
    }

    if (req.authUser.role !== role) {
      throw new UserAccessDeniedException();
    }

    next();
  };
};

export default requireRole;
