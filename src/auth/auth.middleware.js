import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger.js';

dotenv.config();

export const authenticate = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Authentication token is required',
      errors: null
    });
  }

  const token = header.slice(7);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const userId = Number(payload.sub);

    if (!Number.isInteger(userId) || userId <= 0) {
      throw new Error('Invalid token subject');
    }

    req.user = {
      id: userId,
      email: payload.email
    };

    return next();
  } catch (error) {
    logger.warn('JWT authentication failed', {
      path: req.originalUrl,
      message: error.message
    });

    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
      errors: null
    });
  }
};
