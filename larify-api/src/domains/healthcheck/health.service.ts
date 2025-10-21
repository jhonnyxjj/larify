import { logger } from '@/core';
import {prisma } from '@/core';
import { Firebase } from '@/core/auth/firebase/firebase';
import type { IHealthCheckService  } from './contracts';
import type { Health, ServiceStatus } from './types';

export class HealthCheckService implements IHealthCheckService {
 private firebase: Firebase = new Firebase();
  constructor() {
    this.firebase.initializeFirebaseApp();
  }
  
  public async check(): Promise<Health> {
    const details: Record<string, ServiceStatus> = {};

    // 1️ Banco de dados
    details.database = await this.checkDatabase();

    // 2️ Firebase Auth
    details.firebaseAuth = await this.checkFirebase();

    // 3️ Variáveis de ambiente
    details.environment = await this.checkEnvironmentVariables(['FIREBASE_SERVICE_ACCOUNT_BASE64', 'LARIFY_DATABASE_URL']);

    // 4️ Define status geral
    const isOk = Object.values(details).every((s) => s.status === 'ok');

    const result: Health = {
      status: isOk ? 'ok' : 'error',
      timestamp: new Date().toISOString(),
      details,
    };

    logger.info(`[HealthCheck] Status: ${result.status}`);
    return result;
  }

  private async checkDatabase(): Promise<ServiceStatus> {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return { status: 'ok', message: 'Database connected successfully.' };
    } catch (error) {
      return { status: 'error', message: `Database error: ${(error as Error).message}` };
    }
  }

  private async checkFirebase(): Promise<ServiceStatus> {
    try {
      // só um ping simples pra validar o app
       this.firebase.initializeFirebaseApp();
      return { status: 'ok', message: 'Firebase Auth working fine.' };
    } catch (error) {
      return { status: 'error', message: `Firebase error: ${(error as Error).message}` };
    }
  }

  private async checkEnvironmentVariables(keys: string[]): Promise<ServiceStatus> {
    const missing = keys.filter((key) => !process.env[key]);
    if (missing.length > 0) {
      return { status: 'error', message: `Missing env vars: ${missing.join(', ')}` };
    }
    return { status: 'ok', message: 'All required environment variables are set.' };
  }
}