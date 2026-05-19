import { verifyDatabaseConnection } from '../config/db.js';
import { AuthRepository } from '../auth/auth.repository.js';
import { AuthService } from '../auth/auth.service.js';
import { AuthController } from '../auth/auth.controller.js';
import { userMemory } from '../memory/user.memory.js';

let container;

export const initializeContainer = async () => {
  if (container) {
    return container;
  }

  await verifyDatabaseConnection();

  const authRepository = new AuthRepository();
  const users = await authRepository.findAllUsers();
  userMemory.replaceAll(users);

  const authService = new AuthService({
    authRepository,
    userMemory
  });

  const authController = new AuthController({
    authService
  });

  container = {
    authRepository,
    authService,
    authController,
    userMemory
  };

  return container;
};

export const getContainer = () => {
  if (!container) {
    throw new Error('Container has not been initialized');
  }

  return container;
};
