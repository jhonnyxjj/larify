import { ServerError } from './server-error';
export class UnauthorizedError extends ServerError {
  constructor(msg?: string) {
    super('UnauthorizedError', 401, msg);
  }
}
