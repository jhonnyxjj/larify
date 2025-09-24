import { z } from 'zod';

/**
 * @example {
 *   "name": "Fazer café"
 * }
 */
export class CreateTaskRequestDTO {
  name!: string;
}

export const createTaskRequestSchema = z.object({
  name: z.string().min(1),
});
