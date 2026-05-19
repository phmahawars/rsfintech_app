import { verifyDatabaseConnection } from '../config/db.js';
import { AuthRepository } from '../auth/auth.repository.js';
import { AuthService } from '../auth/auth.service.js';
import { AuthController } from '../auth/auth.controller.js';
import { userMemory } from '../memory/user.memory.js';
import { logger } from '../utils/logger.js';

let container;
let initializationPromise;

export const initializeContainer = async () => {
  if (container) {
    return container;
  }

  if (initializationPromise) {
    return initializationPromise;
  }

  initializationPromise = (async () => {
    logger.info('Initializing application container');

    await verifyDatabaseConnection();

    const authRepository = new AuthRepository();
    await authRepository.validateSchema();

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

    logger.info('Application container initialized', {
      usersLoaded: userMemory.size()
    });

    return container;
  })();

  try {
    return await initializationPromise;
  } catch (error) {
    initializationPromise = null;
    logger.error('Application container initialization failed', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      sqlMessage: error.sqlMessage
    });
    throw error;
  }
};

export const getContainer = () => {
  if (!container) {
    const error = new Error('Application container has not been initialized');
    error.statusCode = 503;
    throw error;
  }

  return container;
};
