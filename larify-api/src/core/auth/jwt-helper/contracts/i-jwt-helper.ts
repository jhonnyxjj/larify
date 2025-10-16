import { AuthPayload } from '@/core/auth/types';
export type * as jwt from 'jsonwebtoken';

export interface IJwtHelper {
    generateToken(payload: AuthPayload): Promise<string>;
    verifyToken(token: string): Promise<AuthPayload>;
}