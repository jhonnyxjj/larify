export const NODE_ENV = {
  Local: 'local',
  Dev: 'development',
  Test: 'test',
  Production: 'production',
} as const;

export type NodeEnv = (typeof NODE_ENV)[keyof typeof NODE_ENV];
