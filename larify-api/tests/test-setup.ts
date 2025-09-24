import { createApp } from '@/server';
import request from 'supertest';

export const app = createApp();
export { prisma } from '@/core';
export const server = request(app);
