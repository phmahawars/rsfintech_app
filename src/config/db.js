import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { logger } from '../utils/logger.js';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10),
  queueLimit: 0,
  namedPlaceholders: true
});

export const db = pool;

export const verifyDatabaseConnection = async () => {
  let connection;

  try {
    logger.info('Checking MySQL connection', {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      database: process.env.DB_NAME,
      user: process.env.DB_USER
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
