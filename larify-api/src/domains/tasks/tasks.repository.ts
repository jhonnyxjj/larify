import type { ITasksRepository } from './interfaces';
import type { Task } from './types';
import { prisma } from '@/core';

export class TasksRepository implements ITasksRepository {
  async find(): Promise<Task[]> {
    return prisma.tasks.findMany({});
  }

  async create(data: Pick<Task, 'name'>): Promise<Task> {
    return prisma.tasks.create({
      data: {
        name: data.name,
        completed: false,
      },
    });
  }
}
