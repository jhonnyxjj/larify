export * from './auth-middleware';
export * from './contracts';

import { AuthMiddleware } from './auth-middleware';

export const expressAuthentication = new AuthMiddleware().middlewareAuth;