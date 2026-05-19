import app from './app.js';
import { initializeContainer } from './bootstrap/container.js';
import { closeDatabaseConnection } from './config/db.js';
import { env, getEnvSummary, validateEnv } from './config/env.js';
import { logger } from './utils/logger.js';

let server;

const startServer = async () => {
  try {
    logger.info('Starting server', getEnvSummary());

    const warnings = validateEnv();

    for (const warning of warnings) {
      logger.warn('Environment warning', { warning });
    }

    await initializeContainer();

    server = app.listen(env.PORT, env.HOST, () => {
      logger.info('Server running', {
        host: env.HOST,
        port: env.PORT
      });
    });
  } catch (error) {
    logger.error('Server startup failed', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      sqlMessage: error.sqlMessage
    });
    process.exit(1);
  }
};

const shutdown = async (signal) => {
  logger.info('Shutdown signal received', { signal });

  if (server) {
    await new Promise((resolve) => server.close(resolve));
  }

  await closeDatabaseConnection();
  logger.info('Server shutdown complete');
  process.exit(0);
};

process.on('SIGINT', () => {
  shutdown('SIGINT').catch((error) => {
    logger.error('Shutdown failed', { message: error.message, stack: error.stack });
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  shutdown('SIGTERM').catch((error) => {
    logger.error('Shutdown failed', { message: error.message, stack: error.stack });
    process.exit(1);
  });
});

process.on('unhandledRejection', (error) => {
  logger.error('Unhandled promise rejection', {
    message: error?.message || String(error),
    stack: error?.stack
  });
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught exception', {
    message: error.message,
    stack: error.stack
  });
  process.exit(1);
});

startServer();
