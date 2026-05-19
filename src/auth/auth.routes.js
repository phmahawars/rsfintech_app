import { Router } from 'express';
import { getContainer } from '../bootstrap/container.js';
import { authenticate } from './auth.middleware.js';
import { loginSchema, registerSchema, validateRequest } from './auth.validation.js';

const router = Router();

router.post('/register', validateRequest(registerSchema), (req, res, next) => {
  return getContainer().authController.register(req, res, next);
});

router.post('/login', validateRequest(loginSchema), (req, res, next) => {
  return getContainer().authController.login(req, res, next);
});

router.get('/profile', authenticate, (req, res, next) => {
  return getContainer().authController.profile(req, res, next);
});

export default router;
