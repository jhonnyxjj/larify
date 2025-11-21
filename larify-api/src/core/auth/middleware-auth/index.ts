export * from './auth-middleware';
export * from './contracts';

import { AuthMiddleware } from './auth-middleware';

const authMiddleware = new AuthMiddleware();

export const expressAuthentication = authMiddleware.middlewareAuth.bind(authMiddleware);