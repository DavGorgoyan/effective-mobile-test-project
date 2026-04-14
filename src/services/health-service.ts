import prisma from '../lib/prisma.js';
import type { HealthStatus } from '../types/health.js';

export const getHealthStatus = async (): Promise<HealthStatus> => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return {
      status: 'ok',
      services: {
        database: 'up',
      },
    };
  } catch {
    return {
      status: 'degraded',
      services: {
        database: 'down',
      },
    };
  }
};
