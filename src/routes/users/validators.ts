import { z } from 'zod';
import { UserRole } from '@prisma/client';

export const getUserByIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const blockUserSchema = getUserByIdSchema;

export const listUsersSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().min(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).optional(),
    search: z.string().trim().min(1).optional(),
    role: z.enum(UserRole).optional(),
    isActive: z
      .enum(['true', 'false'])
      .transform((value) => value === 'true')
      .optional(),
  }),
});
