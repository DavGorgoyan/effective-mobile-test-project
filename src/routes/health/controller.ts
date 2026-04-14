import type { Request, Response } from 'express';
import env from '../../config/env.js';
import { getHealthStatus } from '../../services/health-service.js';
import type { ApiResponse } from '../../types/api-response.js';
import type { HealthResponse } from '../../types/health.js';
import { sendSuccess } from '../../utils/api-response.js';

export const getHealth = async (
  _req: Request,
  res: Response<ApiResponse<HealthResponse>>,
): Promise<void> => {
  const health = await getHealthStatus();

  sendSuccess(res, 200, {
    status: health.status,
    environment: env.nodeEnv,
    timestamp: new Date().toISOString(),
    services: health.services,
  });
};
