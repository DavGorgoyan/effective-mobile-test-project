export interface ApiErrorResponse {
  readonly error: string;
  readonly message: string;
  readonly details?: unknown;
}
