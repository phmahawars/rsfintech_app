import dotenv from 'dotenv';
import app from './app.js';
import { initializeContainer } from './bootstrap/container.js';
import { closeDatabaseConnection } from './config/db.js';
import { logger } from './utils/logger.js';

dotenv.config();

let server;

const getPort = () => {
  const port = Number(process.env.PORT || 3000);
  return Number.isFinite(port) && port > 0 ? port : 3000;
};

const getHost = () => {
  return process.env.HOST || '0.0.0.0';
};

const validateEnv = () => {
  const missing = [];

  for (const key of ['DB_HOST', 'DB_USER', 'DB_NAME', 'JWT_SECRET']) {
    if (!process.env[key]) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  if (process.env.JWT_SECRET.length < 32) {
    logger.warn('Environment warning', {
      warning: 'JWT_SECRET should be at least 32 characters long in production'
    });
  }
};

const getEnvSummary = () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  host: getHost(),
  port: getPort(),
  dbHost: process.env.DB_HOST,
  dbPort: Number(process.env.DB_PORT || 3306),
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbConnectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d'
});

const startServer = async () => {
  try {
    logger.info('Starting server', getEnvSummary());

    validateEnv();

    await initializeContainer();

    server = app.listen(getPort(), getHost(), () => {
      logger.info('Server running', {
        host: getHost(),
        port: getPort()
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