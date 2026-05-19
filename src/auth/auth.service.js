import argon2 from 'argon2';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const sanitizeUser = (user) => ({
  id: user.id,
  fullname: user.fullname,
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

    const passwordHash = await argon2.hash(payload.password);

    const user = await this.authRepository.createUser({
      fullname: payload.fullname,
      email: payload.email,
      phone: payload.phone,
      passwordHash
    });

    this.userMemory.set(user);

    return {
      user: sanitizeUser(user),
      token: this.createToken(user)
    };
  }

  async login({ identifier, password }) {
    const user = await this.authRepository.findByEmailOrPhone(identifier);

    if (!user) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      throw error;
    }

    let passwordMatches = false;

    if (isArgon2Hash(user.passwordHash)) {
      passwordMatches = await argon2.verify(user.passwordHash, password);
    } else if (isBcryptHash(user.passwordHash)) {
      passwordMatches = await bcrypt.compare(password, user.passwordHash.replace(/^\$2y\$/, '$2a$'));

      if (passwordMatches) {
        const passwordHash = await argon2.hash(password);
        await this.authRepository.updatePasswordHash(user.id, passwordHash);
        user.passwordHash = passwordHash;
      }
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
