import type { AuthRequest } from '@/core/auth/types';

export interface IAuthMiddleware {
    middlewareAuth(req: Request, securityName: string): Promise<AuthRequest>;
}