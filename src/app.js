import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './auth/auth.routes.js';
import { errorResponse } from './utils/response.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

app.get('/health', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'API is healthy'
  });
});

app.use('/api/auth', authRoutes);

app.use((req, res) => {
  return errorResponse(res, 404, 'Route not found');
});

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = statusCode === 500 ? 'Internal server error' : error.message;

  if (statusCode === 500) {
    console.error(error);
  }

  return errorResponse(res, statusCode, message);
});

export default app;
