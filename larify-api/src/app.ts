import { initializeGlobalErrorHandler } from './core/errors';
import { startServer } from './server';

initializeGlobalErrorHandler();
startServer();
