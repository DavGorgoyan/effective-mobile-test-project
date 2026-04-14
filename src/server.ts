import type { Server } from 'node:http';
import createApp from './app.js';
import env from './config/env.js';
import prisma from './lib/prisma.js';

const app = createApp();

const startServer = async (): Promise<Server> => {
  await prisma.$connect();

  return app.listen(env.port, () => {
    console.info(`Server listening on port ${env.port}`);
  });
};

const setupGracefulShutdown = (server: Server): void => {
  const shutdown = async (signal: NodeJS.Signals): Promise<void> => {
    console.info(`Received ${signal}. Closing server...`);

    server.close(async () => {
      await prisma.$disconnect();
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
};

void (async () => {
  try {
    const server: Server = await startServer();
    setupGracefulShutdown(server);
  } catch (error: unknown) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
})();
