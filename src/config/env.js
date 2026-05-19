import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../..');
const envPath = process.env.ENV_FILE || path.join(projectRoot, '.env');

dotenv.config({ path: envPath });

const readString = (key, fallback = '') => {
  const value = process.env[key];
  return typeof value === 'string' && value.trim() !== '' ? value.trim() : fallback;
};

const readNumber = (key, fallback) => {
  const value = readString(key);
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export const env = {
  NODE_ENV: readString('NODE_ENV', 'development'),
  HOST: readString('HOST', '0.0.0.0'),
  PORT: readNumber('PORT', 3000),
  DB_HOST: readString('DB_HOST'),
  DB_PORT: readNumber('DB_PORT', 3306),
  DB_USER: readString('DB_USER'),
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: readString('DB_NAME'),
  DB_CONNECTION_LIMIT: readNumber('DB_CONNECTION_LIMIT', 10),
  JWT_SECRET: readString('JWT_SECRET'),
  JWT_EXPIRES_IN: readString('JWT_EXPIRES_IN', '7d'),
  ENV_PATH: envPath,
  PROJECT_ROOT: projectRoot
};

export const validateEnv = () => {
  const missing = [];

  for (const key of ['DB_HOST', 'DB_USER', 'DB_NAME', 'JWT_SECRET']) {
    if (!env[key]) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    const error = new Error(`Missing required environment variables: ${missing.join(', ')}`);
    error.statusCode = 500;
    throw error;
  }

  return getEnvWarnings();
};

export const getEnvWarnings = () => {
  const warnings = [];

  if (env.JWT_SECRET && env.JWT_SECRET.length < 32) {
    warnings.push('JWT_SECRET should be at least 32 characters long in production');
  }

  return warnings;
};

export const getEnvSummary = () => ({
  nodeEnv: env.NODE_ENV,
  host: env.HOST,
  port: env.PORT,
  dbHost: env.DB_HOST,
  dbPort: env.DB_PORT,
  dbName: env.DB_NAME,
  dbUser: env.DB_USER,
  dbConnectionLimit: env.DB_CONNECTION_LIMIT,
  jwtExpiresIn: env.JWT_EXPIRES_IN,
  envPath: env.ENV_PATH,
  projectRoot: env.PROJECT_ROOT
});
