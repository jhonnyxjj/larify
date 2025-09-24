import type { Task } from '../types';

export interface ITasksRepository {
  find(): Promise<Task[]>;
  create(data: Pick<Task, 'name'>): Promise<Task>;
}
