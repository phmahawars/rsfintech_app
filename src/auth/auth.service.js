import dotenv from 'dotenv';
import argon2 from 'argon2';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger.js';

dotenv.config();

const sanitizeUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt
});

const isArgon2Hash = (hash) => {
  return typeof hash === 'string' && hash.startsWith('$argon2');
};

const isBcryptHash = (hash) => {
  return typeof hash === 'string' && /^\$2[aby]\$/.test(hash);
};

const normalizeBcryptHash = (hash) => {
  return hash.replace(/^\$2y\$/, '$2a$');
};

const createPhpPasswordHash = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash.replace(/^\$2[ab]\$/, '$2y$');
};

export class AuthService {
  constructor({ authRepository, userMemory }) {
    this.authRepository = authRepository;
    this.userMemory = userMemory;
  }

  createToken(user) {
    return jwt.sign(
      {
        sub: String(user.id),
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
      }
    );
  }

  async register(payload) {
    const existingEmail = await this.authRepository.findByEmail(payload.email);

    if (existingEmail) {
      const error = new Error('Email is already registered');
      error.statusCode = 409;
      throw error;
    }

    const existingPhone = await this.authRepository.findByPhone(payload.phone);

    if (existingPhone) {
      const error = new Error('Phone is already registered');
      error.statusCode = 409;
      throw error;
    }

    const passwordHash = await createPhpPasswordHash(payload.password);

    let user;

    try {
      user = await this.authRepository.createUser({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        passwordHash
      });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        const conflictError = new Error('Email or phone is already registered');
        conflictError.statusCode = 409;
        throw conflictError;
      }

      throw error;
    }

    this.userMemory.set(user);
    logger.info('User registered', { userId: user.id });

    return {
      user: sanitizeUser(user),
      token: this.createToken(user)
    };
  }

  async login({ email, phone, password }) {
    const user = await this.authRepository.findByLogin({ email, phone });

    if (!user) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      throw error;
    }

    let passwordMatches = false;

    if (isArgon2Hash(user.passwordHash)) {
      try {
        passwordMatches = await argon2.verify(user.passwordHash, password);
      } catch (error) {
        logger.warn('Argon2 password verification failed', {
          userId: user.id,
          message: error.message
        });
      }
    } else if (isBcryptHash(user.passwordHash)) {
      passwordMatches = await bcrypt.compare(password, normalizeBcryptHash(user.passwordHash));
    } else {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      throw error;
    }

    if (!passwordMatches) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      throw error;
    }

    this.userMemory.set(user);
    logger.info('User logged in', { userId: user.id });

    return {
      user: sanitizeUser(user),
      token: this.createToken(user)
    };
  }

  getProfile(userId) {
    const user = this.userMemory.getById(userId);

    if (!user) {
      const error = new Error('User not found in memory');
      error.statusCode = 404;
      throw error;
    }

    return sanitizeUser(user);
  }
}
