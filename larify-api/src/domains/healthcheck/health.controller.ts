import { Get, Route } from 'tsoa';
import { HealthCheckService } from './health.service';
import  { type Health } from './types';
import type { IHealthCheckService } from './contracts';

@Route('healthcheck')
export class HealthCheckController {
 
  constructor(private readonly service: IHealthCheckService = new HealthCheckService()) {}

  @Get('/')
  public async check(): Promise<Health> {
    return this.service.check();
  }

}
