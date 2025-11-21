import { Controller, Get, Route, Security } from 'tsoa';
import { logger } from '@/core';

@Route('test')
export class TestController extends Controller {
  @Get('/auth')
  @Security('jwt')
  public async testRoute(): Promise<{ message: string }> {
    logger.info(
      { controller: 'TestController', method: 'testRoute' },
      'Rota de teste autenticada acessada'
    );
    return { message: 'Rota protegida acessada com sucesso!' };
  }
}
 