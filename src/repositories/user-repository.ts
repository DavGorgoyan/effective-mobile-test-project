import { Prisma, type User } from "@prisma/client";
import prisma from "../lib/prisma.js";
import type { FindManyUsersFilters } from "../types/user.js";

const findByEmail = async (email: string): Promise<User | null> => {
  return await prisma.user.findUnique({ where: { email } });
};

const findById = async (id: string): Promise<User | null> => {
  return await prisma.user.findUnique({ where: { id } });
};

const createUser = async (data: Prisma.UserCreateInput): Promise<User> => {
  return await prisma.user.create({ data });
};

const blockUser = async (id: string): Promise<User> => {
  return await prisma.user.update({
    where: { id },
    data: { isActive: false },
  });
};

const findMany = async (filters: FindManyUsersFilters): Promise<User[]> => {
  const { page, limit, search, role, isActive } = filters;
  const where: Prisma.UserWhereInput = {
    ...(search
      ? {
          OR: [
            { email: { contains: search } },
            { fullName: { contains: search } },
          ],
        }
      : {}),
    ...(role ? { role } : {}),
    ...(typeof isActive === "boolean" ? { isActive } : {}),
  };

  return await prisma.user.findMany({
    where,
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * limit,
    take: limit,
  });
};

export default {
  findByEmail,
  findById,
  createUser,
  blockUser,
  findMany,
};
