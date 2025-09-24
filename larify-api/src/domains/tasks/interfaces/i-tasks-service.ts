import type { Task } from '../types';

export interface ITasksService {
  getAll(): Promise<Task[]>;
  create(name: string): Promise<Task>;
}
