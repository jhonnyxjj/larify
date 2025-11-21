import { UnauthorizedError } from '@/core/errors/server-errors/unauthorized-error';
import type { IJwtHelper } from '../jwt-helper/contracts/i-jwt-helper';

import { JwtHelper } from '../jwt-helper/jwt-helper';
import type { IAuthMiddleware } from './contracts';
import type { AuthRequest } from '../_types';
import { logger } from '@/core';

export class AuthMiddleware implements IAuthMiddleware {
  constructor(private readonly jwtHelper: IJwtHelper = new JwtHelper()) {}

  public async middlewareAuth(req: AuthRequest, securityName: string): Promise<AuthRequest> {
    try {
      if (securityName !== 'jwt') {
        throw new UnauthorizedError('invalid security name provided to auth middleware');
      }

      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('Authorization header missing or invalid');
      }

      const token = authHeader.split(' ')[1].trim();

      if (!token) {
        throw new UnauthorizedError('token missing');
      }

      const user = await this.jwtHelper.verifyToken(token);
      if (!user ) {
        throw new UnauthorizedError('Invalid token payload');
      }

      req.user = user;
      return req;
    } catch (err) {
      logger.error(err, 'Authentication error');
      throw new UnauthorizedError('Authentication failed');
    }
  }
}
