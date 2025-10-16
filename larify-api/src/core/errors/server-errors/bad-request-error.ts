import { ServerError } from '@/core';

export class BadRequestError extends ServerError {
  constructor(msg?: string) {
    super('BadRequestError', 400, msg);
  }
}
