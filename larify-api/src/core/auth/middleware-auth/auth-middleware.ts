import { UnauthorizedError } from '@/core/errors/server-errors/unauthorized-error';
import { JwtHelper } from '../jwt-helper/jwt-helper';
import { IAuthMiddleware } from './contracts';
import type { IJwtHelper } from '../jwt-helper/contracts';
import type { AuthRequest } from '../_types';
import {  logger } from '@/core';

export class AuthMiddleware implements IAuthMiddleware {
  

  constructor(private readonly jwtHelper: IJwtHelper = new JwtHelper()) {
    this.jwtHelper = jwtHelper;
  }

  public async middlewareAuth(req: AuthRequest, securityName: string): Promise<AuthRequest> {
    try {
      if (securityName !== 'Jwt') {
        throw new Error('invalid security name');
      }

      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new Error('Authorization header missing or invalid');
      }

      const token = authHeader.replace('Bearer ', '');

      const user = await this.jwtHelper.verifyToken(token);
      req.user = user;
      return req;
    } catch (err) {
      logger.error('Authentication error');
      throw err instanceof UnauthorizedError ? err : new UnauthorizedError('Authentication failed');
    }
  }
}
