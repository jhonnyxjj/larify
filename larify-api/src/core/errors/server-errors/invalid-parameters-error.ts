import { ServerError } from '@/core';

export class InvalidParametersError extends ServerError {
  constructor(msg?: string) {
    super('InvalidParametersError', 400, msg);
  }
}
