import { logger } from '@/core';
import type { ITasksRepository, ITasksService } from './interfaces';
import { TasksRepository } from './tasks.repository';
import type { Task } from './types';

export class TasksService implements ITasksService {
  constructor(private readonly repo: ITasksRepository = new TasksRepository()) {}

  async getAll(): Promise<Task[]> {
    return this.repo.find();
  }

  async create(name: string): Promise<Task> {
    const newTask = await this.repo.create({ name });
    logger.info(`New task with name "${name}" created. ID: ${newTask.id}"`);
    return newTask;
  }
}
