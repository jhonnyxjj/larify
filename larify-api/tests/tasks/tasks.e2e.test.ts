import { describe, it, expect, beforeEach } from 'bun:test';
import { prisma, server } from '../test-setup';

describe('Tasks', () => {
  beforeEach(async () => {
    prisma.$executeRawUnsafe('DELETE * FROM tasks');
  });

  it('should return empty array of tasks', async () => {
    const res = await server.get('/tasks');
    expect(res.status).toBe(200);
  });

  it('should return array with 1 task', async () => {
    await prisma.tasks.create({
      data: {
        name: 'Test Task',
        completed: false,
      },
    });
    const res = await server.get('/tasks');
    expect(res.status).toBe(200);
    expect(res.body.tasks).toBeArray();
    expect(res.body.tasks.length).toBe(1);
    expect(res.body.tasks[0].name).toBe('Test Task');
    expect(res.body.tasks[0].completed).toBeFalse();
  });
});
