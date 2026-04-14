import { type User } from "@prisma/client";
import env from "../config/env.js";
import {
  EmailAlreadyExistsException,
  InvalidTokenException,
  PasswordIsNotCorrectException,
  UserBlockedException,
} from "../exceptions/auth.exception.js";
import userRepository from "../repositories/user-repository.js";
import type { JwtPayload, LoginInput, RegisterInput } from "../types/auth.js";
import type { PublicUser } from "../types/user.js";
import { signAccessToken, verifyToken } from "../utils/jwt.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import { UserNotFoundException } from "../exceptions/user.exception.js";

const toPublicUser = (user: User): PublicUser => {
  return {
    id: user.id,
    fullName: user.fullName,
    dateOfBirth:
      user.dateOfBirth.toISOString().split("T")[0] ??
      user.dateOfBirth.toISOString(),
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
};

const register = async (input: RegisterInput): Promise<PublicUser> => {
  const existingUser = await userRepository.findByEmail(input.email);

  if (existingUser) {
    throw new EmailAlreadyExistsException();
  }

  const passwordHash = await hashPassword(input.password);

  const createdUser = await userRepository.createUser({
    fullName: input.fullName,
    dateOfBirth: input.dateOfBirth,
    email: input.email,
    password: passwordHash,
  });

  return toPublicUser(createdUser);
};

const login = async (input: LoginInput): Promise<{ accessToken: string }> => {
  const user = await userRepository.findByEmail(input.email);

  if (!user) {
    throw new UserNotFoundException();
  }

  if (!user.isActive) {
    throw new UserBlockedException();
  }

  const isPasswordValid = await comparePassword(input.password, user.password);

  if (!isPasswordValid) {
    throw new PasswordIsNotCorrectException();
  }

  const payload: JwtPayload = {
    sub: user.id,
    role: user.role,
  };

  const accessToken: string = signAccessToken(payload);

  return { accessToken };
};

const verifyAccessToken = (token: string): JwtPayload => {
  let decodedToken: JwtPayload;

  try {
    decodedToken = verifyToken(token, env.jwtSecret);
  } catch {
    throw new InvalidTokenException();
  }

  if (
    typeof decodedToken !== "object" ||
    decodedToken === null ||
    typeof decodedToken.sub !== "string" ||
    !decodedToken.role
  ) {
    throw new InvalidTokenException();
  }

  return {
    sub: decodedToken.sub,
    role: decodedToken.role,
  };
};

export default {
  register,
  login,
  verifyAccessToken,
  toPublicUser,
};
