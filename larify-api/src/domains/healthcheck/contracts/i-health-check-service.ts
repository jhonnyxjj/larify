import type { Health } from '../types';

export interface IHealthCheckService {
  check (): Promise<Health>;
}
