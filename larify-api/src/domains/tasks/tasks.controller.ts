import { Body, Get, Post, Route } from 'tsoa';
import { type CreateTaskRequestDTO, createTaskRequestSchema, GetAllTasksResponseDTO } from './dto';
import { type ITasksService } from './interfaces';
import { TasksService } from './tasks.service';
import { Task } from './types';
import { validateRequestInput } from '@/core/utils';

@Route('tasks')
export class TasksController {
  constructor(private readonly service: ITasksService = new TasksService()) {}

  @Get('/')
  public async getTasks(): Promise<GetAllTasksResponseDTO> {
    return {
      tasks: await this.service.getAll(),
    };
  }

  ///testegg

  @Post('/')
  public async createTask(@Body() body: CreateTaskRequestDTO): Promise<Task> {
    validateRequestInput(createTaskRequestSchema, body);
    return this.service.create(body.name);
  }
}
