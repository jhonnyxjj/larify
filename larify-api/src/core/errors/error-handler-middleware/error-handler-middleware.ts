import type { ErrorRequestHandler } from 'express';
import { logger } from '@/core';
import { ServerError } from '../server-errors';
import type { FieldErrors } from 'tsoa';
import { ValidateError } from 'tsoa';

export const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ValidateError) {
    res.status(400).json({
      error: 'ValidationError',
      message: extractErrors(err?.fields),
    });
    return next();
  }

  if (err instanceof ServerError) {
    const se = err as ServerError;
    res.status(se.statusCode).json({
      error: se.name,
      message: se.message,
    });
    return next();
  }

  logger.error({ err, url: req.url, method: req.method }, 'Unhandled error');
  res.status(500).json({
    error: 'InternalServerError',
    message: "Oops... something went wrong. We've been notified.",
  });
  return next();
};

const extractErrors = (errors: FieldErrors): string => {
  return Object.entries(errors)
    .map(([k, v]) => `${k} - ${v.message}`)
    .join(', ');
};
