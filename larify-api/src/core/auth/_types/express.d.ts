import type * as express from 'express';
import type { AuthPayload } from './auth-payload';

export interface AuthRequest extends express.Request {
    user: AuthPayload;
}
