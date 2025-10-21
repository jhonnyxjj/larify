import { ServerError } from './server-error';

export class ConfigurationError extends ServerError {
  constructor(msg?: string) {
    super('ConfigurationError', 500, msg);
  }
}
