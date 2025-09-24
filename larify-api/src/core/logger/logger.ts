import pino from 'pino';
import { env, NODE_ENV } from '@/core';

const isTest = env.NODE_ENV === NODE_ENV.Test;
const isDev = env.NODE_ENV !== NODE_ENV.Production;

export const logger = isTest
  ? pino({ level: 'debug' })
  : pino(
      { level: env.LOG_LEVEL },
      pino.transport({
        targets: [
          {
            level: 'error',
            target: './slack-transport/slack-transport.js',
            options: {
              webhookUrl: env.SLACK_ERROR_WEBHOOK,
            },
          },
          ...(isDev
            ? [
                {
                  level: 'debug',
                  target: 'pino-pretty',
                  options: {
                    colorize: true,
                    translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
                    ignore: 'pid,hostname',
                  },
                },
              ]
            : []),
        ],
      })
    );
