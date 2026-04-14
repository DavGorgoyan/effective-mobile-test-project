import { UserRole } from "@prisma/client";

export interface AuthUser {
  readonly id: string;
  readonly role: UserRole;
}

export interface JwtPayload {
  readonly sub: string;
  readonly role: UserRole;
}
