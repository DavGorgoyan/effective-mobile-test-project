import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    fullName: z.string().trim().min(1),
    dateOfBirth: z.string().date(),
    email: z.string().trim().email(),
    password: z.string().min(8),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().trim().email(),
    password: z.string().min(1),
  }),
});
