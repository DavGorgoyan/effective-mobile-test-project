import type { Request, Response } from 'express';
import env from '../../config/env.js';
import { getHealthStatus } from '../../services/health-service.js';

interface HealthResponse {
  readonly status: 'ok' | 'degraded';
  readonly environment: string;
  readonly timestamp: string;
  readonly services: {
    readonly database: 'up' | 'down';
  };
}

export const getHealth = async (_req: Request, res: Response<HealthResponse>): Promise<void> => {
  const health: {
    status: 'ok' | 'degraded';
    services: {
      database: 'up' | 'down';
    };
  } = await getHealthStatus();

  res.status(200).json({
    status: health.status,
    environment: env.nodeEnv,
    timestamp: new Date().toISOString(),
    services: health.services,
  });
};
