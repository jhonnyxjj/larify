import express from 'express';
import { errorHandlerMiddleware } from '@/core/errors/error-handler-middleware';
import { env, logger } from '@/core';
import { RegisterRoutes } from './tsoa-generated/routes';

export function createApp() {
  const app = express();
  app.use(express.json());
  RegisterRoutes(app);
  app.use(errorHandlerMiddleware);
  return app;
}

export function startServer() {
  const app = createApp();
  app.listen(env.PORT, () => {
    logger.info(`Server listening on PORT ${env.PORT}`);
  });
}
