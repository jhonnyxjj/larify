import type { AuthRequest } from '@/core/auth/_types';

export interface IAuthMiddleware {
    middlewareAuth(req: AuthRequest, securityName: string): Promise<AuthRequest>;
}