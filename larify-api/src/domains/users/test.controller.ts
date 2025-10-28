import { Controller, Get, Route, Security } from 'tsoa';

@Route('test')
export class TestController extends Controller {
  @Get('/')
  @Security('jwt')
  public async testRoute(): Promise<{ message: string }> {
    return { message: 'Rota protegida acessada com sucesso!' };
  }
}
 