import { App } from 'firebase-admin/app';
import type { AuthPayload } from '@/core/auth/_types';

export interface IFirebase {
    initializeFirebaseApp(): App;
    verifyFirebaseToken(idToken: string): Promise<AuthPayload>;
}