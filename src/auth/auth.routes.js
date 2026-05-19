import { Router } from 'express';
import { getContainer } from '../bootstrap/container.js';
import { authenticate } from './auth.middleware.js';
import { loginSchema, registerSchema, validateRequest } from './auth.validation.js';

const router = Router();

const getAuthController = (next) => {
  try {
    return getContainer().authController;
  } catch (error) {
    next(error);
    return null;
  }
};

router.post('/register', validateRequest(registerSchema), (req, res, next) => {
  const authController = getAuthController(next);
  return authController ? authController.register(req, res, next) : null;
});

router.post('/login', validateRequest(loginSchema), (req, res, next) => {
  const authController = getAuthController(next);
  return authController ? authController.login(req, res, next) : null;
});

router.get('/profile', authenticate, (req, res, next) => {
  const authController = getAuthController(next);
  return authController ? authController.profile(req, res, next) : null;
});

export default router;
