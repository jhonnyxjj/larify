import { ServerError } from './server-error';

export class FirebaseInternalError extends ServerError {
  constructor(msg?: string) {
    super('FirebaseInternalError', 500, msg);
  }
}
