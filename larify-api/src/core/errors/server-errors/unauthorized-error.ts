import { ServerError } from '@/core';

export class UnauthorizedError extends ServerError {
  constructor(msg?: string) {
    super('UnauthorizedError', 401, msg);
  }
}
