export interface HealthServices {
  readonly database: 'up' | 'down';
}

export interface HealthStatus {
  readonly status: 'ok' | 'degraded';
  readonly services: HealthServices;
}

export interface HealthResponse extends HealthStatus {
  readonly environment: string;
  readonly timestamp: string;
}
