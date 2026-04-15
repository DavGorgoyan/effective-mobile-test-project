import { UserRole } from "@prisma/client";
import { PublicUser } from "./user.js";

export interface AuthUser {
  readonly id: string;
  readonly role: UserRole;
}

export interface JwtPayload {
  readonly sub: string;
  readonly role: UserRole;
}

export interface RegisterInput {
  readonly fullName: string;
  readonly dateOfBirth: Date;
  readonly email: string;
  readonly password: string;
}

export interface LoginInput {
  readonly email: string;
  readonly password: string;
}

export interface RegisterUserData {
  readonly user: Pick<
    PublicUser,
    "id" | "fullName" | "email" | "role" | "isActive"
  >;
}

export interface LoginData {
  readonly accessToken: string;
}
