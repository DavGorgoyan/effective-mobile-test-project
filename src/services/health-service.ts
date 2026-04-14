import prisma from '../lib/prisma.js';

export interface HealthStatus {
  readonly status: 'ok' | 'degraded';
  readonly services: {
    readonly database: 'up' | 'down';
  };
}

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
