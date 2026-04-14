import { PrismaClient } from '@prisma/client';
import env from '../config/env.js';

const createPrismaClient = (): PrismaClient => {
  return new PrismaClient({
    log: env.nodeEnv === 'development' ? ['query', 'warn', 'error'] : ['error'],
  });
};

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

const prisma: PrismaClient = globalForPrisma.prisma ?? createPrismaClient();

if (env.nodeEnv !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
