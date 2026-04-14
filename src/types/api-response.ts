export interface ApiErrorMeta {
  readonly code: number;
  readonly message: string;
  readonly details?: unknown;
}

export interface ApiMeta {
  readonly error: ApiErrorMeta | null;
  readonly status: number;
}

export interface ApiResponse<T> {
  readonly meta: ApiMeta;
  readonly data: T;
}
