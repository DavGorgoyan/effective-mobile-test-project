import { UserRole } from '@prisma/client';
import {
  CannotBlockUserException,
  UserAccessDeniedException,
  UserNotFoundException,
} from '../exceptions/user.exception.js';
import userRepository from '../repositories/user-repository.js';
import type { Actor, ListUsersQuery, PublicUser } from '../types/user.js';
import authService from './auth-service.js';

const getUserById = async (actor: Actor, userId: string): Promise<PublicUser> => {
  const isSelf: boolean = actor.id === userId;
  const isAdmin: boolean = actor.role === UserRole.ADMIN;

  if (!isAdmin && !isSelf) {
    throw new UserAccessDeniedException();
  }

  const user = await userRepository.findById(userId);

  if (!user) {
    throw new UserNotFoundException();
  }

  return authService.toPublicUser(user);
};

const listUsers = async (actor: Actor, query: ListUsersQuery): Promise<PublicUser[]> => {
  if (actor.role !== UserRole.ADMIN) {
    throw new UserAccessDeniedException();
  }

  const users = await userRepository.findMany({
    page: query.page ?? 1,
    limit: query.limit ?? 10,
    search: query.search,
    role: query.role,
    isActive: query.isActive,
  });

  return users.map(authService.toPublicUser);
};

const blockUser = async (actor: Actor, userId: string): Promise<void> => {
  const isSelf: boolean = actor.id === userId;
  const isAdmin: boolean = actor.role === UserRole.ADMIN;

  if (!isAdmin && !isSelf) {
    throw new CannotBlockUserException();
  }

  if (isAdmin && isSelf) {
    throw new CannotBlockUserException();
  }

  const user = await userRepository.findById(userId);

  if (!user) {
    throw new UserNotFoundException();
  }

  if (!user.isActive) {
    return;
  }

  await userRepository.blockUser(userId);
};

export default {
  getUserById,
  listUsers,
  blockUser,
};
