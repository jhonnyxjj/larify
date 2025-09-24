import { z } from 'zod';
import { NODE_ENV } from './types';

export const EnvSchema = z.object({
  NODE_ENV: z.enum(Object.values(NODE_ENV) as [string, ...string[]]).default(NODE_ENV.Local),
  PORT: z.string().transform(Number).default('3000'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error', 'fatal']),
  SLACK_ERROR_WEBHOOK: z.string().url().optional(),
});
