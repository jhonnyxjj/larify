import { logger } from '@/core/logger';

export function initializeGlobalErrorHandler() {
  process.on('unhandledRejection', (reason) => {
    logger.error(reason, '❌ Unhandled Promise Rejection');
  });

  process.on('uncaughtException', (err) => {
    logger.fatal(err, '❌ Uncaught Exception');
  });
}
