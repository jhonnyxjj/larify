import { initializeApp, getApp, cert, App, ServiceAccount, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { env } from '@/core/env/parser';
import { Buffer } from 'buffer';
import { logger } from '@/core/logger';

import {type AuthPayload } from '@/core/auth/_types';
import type { IFirebase } from './contracts';
import { UnauthorizedError, ConfigurationError, FirebaseInternalError } from '@/core/errors';

export class Firebase implements IFirebase {
  private readonly serviceAccount: ServiceAccount;

  constructor() {
    try {
      const decodedBase64 = Buffer.from(env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString(
        'utf8'
      );
      this.serviceAccount = JSON.parse(decodedBase64) as ServiceAccount;
    } catch (err) {
      if (err instanceof Error) {
        logger.error('Failed to decode Firebase config: ' + err.message);
      }
      throw new ConfigurationError('Invalid Firebase configuration');
    }
  }

  public initializeFirebaseApp(): App {
    try {
      if (!getApps().length) {
        initializeApp({
          credential: cert(this.serviceAccount),
        });
      }
      return getApp();
    } catch (error) {
      if (error instanceof Error) {
        logger.error('Error initializing Firebase App: ' + error.message);
      }
      throw new FirebaseInternalError('Internal error communicating with Firebase');
    }
  }

  public async verifyFirebaseToken(token: string): Promise<AuthPayload> {
    if (!token) {
      throw new UnauthorizedError('No token provided');
    }
    try {
      const decoded = await getAuth(this.initializeFirebaseApp()).verifyIdToken(token);
      return {
        userId: decoded.uid, // Mapeia UID para userId
        email: decoded.email!,
      };
    } catch (err) {
      if (err instanceof Error) {
        logger.error('Error verifying Firebase token: ' + err.message);
      }
      throw new UnauthorizedError('Invalid or expired token');
    }
  }
}
