export interface EnvConfig {
  readonly nodeEnv: string;
  readonly port: number;
  readonly databaseUrl: string;
  readonly jwtSecret: string;
  readonly jwtExpiresIn: string;
}
