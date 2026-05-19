import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { randomUUID } from 'crypto';
import authRoutes from './auth/auth.routes.js';
import { env } from './config/env.js';
import { errorResponse } from './utils/response.js';
import { logger } from './utils/logger.js';

const app = express();

app.use((req, res, next) => {
  req.requestId = randomUUID();
  res.setHeader('X-Request-Id', req.requestId);
  next();
});

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

if (env.NODE_ENV !== 'test') {
  app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

app.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'RSFintech API Running Successfully'
  });
});

app.get('/health', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'API is healthy',
    data: {
      uptime: process.uptime(),
      environment: env.NODE_ENV
    }
  });
});

app.use('/api/auth', authRoutes);

app.use((req, res) => {
  return errorResponse(res, 404, 'Route not found');
});

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || error.status || 500;
  const isServerError = statusCode >= 500;
  const isInvalidJson = error.type === 'entity.parse.failed';
  const message = isInvalidJson
    ? 'Invalid JSON payload'
    : isServerError && env.NODE_ENV === 'production'
      ? 'Internal server error'
      : error.message;

  const logMeta = {
    requestId: req.requestId,
    method: req.method,
    path: req.originalUrl,
    statusCode,
    message: error.message,
    stack: error.stack,
    code: error.code,
    errno: error.errno,
    sqlState: error.sqlState,
    sqlMessage: error.sqlMessage
  };

  if (isServerError) {
    logger.error('Request failed', logMeta);
  } else {
    logger.warn('Request rejected', logMeta);
  }

  const errors = env.NODE_ENV === 'production'
    ? { requestId: req.requestId }
    : {
        requestId: req.requestId,
        code: error.code || null
      };

  return errorResponse(res, statusCode, message, errors);
});

export default app;
