import dotenv from 'dotenv';
import { ConfigException } from '../exceptions/app.exception.js';
import type { EnvConfig } from '../types/env.js';

dotenv.config();

const parsePort = (rawPort: string | undefined): number => {
  const port: number = Number(rawPort);

  if (!Number.isInteger(port) || port <= 0 || port > 65535) {
    return 3000;
  }

  return port;
};

const getRequiredEnv = (key: 'DATABASE_URL' | 'JWT_SECRET'): string => {
  const value: string | undefined = process.env[key];

  if (!value) {
    throw new ConfigException(key);
  }

  return value;
};

const env: EnvConfig = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: parsePort(process.env.PORT),
  databaseUrl: getRequiredEnv('DATABASE_URL'),
  jwtSecret: getRequiredEnv('JWT_SECRET'),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '1d',
};

export default env;
