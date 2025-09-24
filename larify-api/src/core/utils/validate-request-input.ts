import type { ZodSchema } from 'zod';
import { InvalidParametersError } from '..';
import { zodErrorToString } from './zod-error-to-string';

export function validateRequestInput(schema: ZodSchema, data: unknown) {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new InvalidParametersError(zodErrorToString(result.error));
  }
}
