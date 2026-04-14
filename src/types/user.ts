import { UserRole } from "@prisma/client";

export interface PublicUser {
  readonly id: string;
  readonly fullName: string;
  readonly dateOfBirth: string;
  readonly email: string;
  readonly role: UserRole;
  readonly isActive: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface Actor {
  readonly id: string;
  readonly role: UserRole;
}

export interface ListUsersQuery {
  readonly page?: number;
  readonly limit?: number;
  readonly search?: string;
  readonly role?: UserRole;
  readonly isActive?: boolean;
}

export interface FindManyUsersFilters {
  readonly page: number;
  readonly limit: number;
  readonly search?: string;
  readonly role?: UserRole;
  readonly isActive?: boolean;
}

export interface GetUserData {
  readonly user: PublicUser;
}

export interface ListUsersData {
  readonly users: PublicUser[];
}

export interface BlockUserData {
  readonly success: boolean;
}
