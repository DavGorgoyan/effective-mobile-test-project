import { Router } from 'express';
import { UserRole } from '@prisma/client';
import authenticate from '../../middleware/authenticate.js';
import requireRole from '../../middleware/require-role.js';
import validateRequest from '../../middleware/validate-request.js';
import * as controller from './controller.js';
import { blockUserSchema, getUserByIdSchema, listUsersSchema } from './validators.js';

const usersRouter: Router = Router();

usersRouter.get(
  '/',
  authenticate,
  requireRole(UserRole.ADMIN),
  validateRequest(listUsersSchema),
  controller.getUsers,
);
usersRouter.get('/:id', authenticate, validateRequest(getUserByIdSchema), controller.getUserById);
usersRouter.patch('/:id/block', authenticate, validateRequest(blockUserSchema), controller.blockUser);

export default usersRouter;
