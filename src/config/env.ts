import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
  readonly nodeEnv: string;
  readonly port: number;
  readonly databaseUrl: string;
}

const parsePort = (rawPort: string | undefined): number => {
  const port: number = Number(rawPort);

  if (!Number.isInteger(port) || port <= 0 || port > 65535) {
    return 3000;
  }

  return port;
};

const getRequiredEnv = (key: 'DATABASE_URL'): string => {
  const value: string | undefined = process.env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};

const env: EnvConfig = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: parsePort(process.env.PORT),
  databaseUrl: getRequiredEnv('DATABASE_URL'),
};

export default env;
