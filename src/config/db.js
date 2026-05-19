import mysql from 'mysql2/promise';
import { env } from './env.js';
import { logger } from '../utils/logger.js';

const pool = mysql.createPool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  waitForConnections: true,
  connectionLimit: env.DB_CONNECTION_LIMIT,
  queueLimit: 0,
  namedPlaceholders: true
});

export const db = pool;

export const verifyDatabaseConnection = async () => {
  let connection;

  try {
    logger.info('Checking MySQL connection', {
      host: env.DB_HOST,
      port: env.DB_PORT,
      database: env.DB_NAME,
      user: env.DB_USER
    });

    connection = await pool.getConnection();
    await connection.query('SELECT 1');

    logger.info('MySQL connection verified');
  } catch (error) {
    logger.error('MySQL connection failed', {
      message: error.message,
      code: error.code,
      errno: error.errno,
      sqlState: error.sqlState
    });

    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const closeDatabaseConnection = async () => {
  await pool.end();
};
