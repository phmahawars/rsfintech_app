import { verifyDatabaseConnection } from '../config/db.js';
import { AuthRepository } from '../auth/auth.repository.js';
import { AuthService } from '../auth/auth.service.js';
import { AuthController } from '../auth/auth.controller.js';
import { CibilCreditReportsRepository } from '../cibil-credit-reports/cibil-credit-reports.repository.js';
import { CibilCreditReportsService } from '../cibil-credit-reports/cibil-credit-reports.service.js';
import { CibilCreditReportsController } from '../cibil-credit-reports/cibil-credit-reports.controller.js';

import { ExperianCreditReportsRepository } from '../experian-credit-reports/experian-credit-reports.repository.js';
import { ExperianCreditReportsService } from '../experian-credit-reports/experian-credit-reports.service.js';
import { ExperianCreditReportsController } from '../experian-credit-reports/experian-credit-reports.controller.js';
import { CrifCreditReportsRepository } from '../crif-credit-reports/crif-credit-reports.repository.js';
import { CrifCreditReportsService } from '../crif-credit-reports/crif-credit-reports.service.js';
import { CrifCreditReportsController } from '../crif-credit-reports/crif-credit-reports.controller.js';
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

    const cibilCreditReportsRepository = new CibilCreditReportsRepository();
    await cibilCreditReportsRepository.validateSchema();

    const cibilCreditReportsService = new CibilCreditReportsService({
      cibilCreditReportsRepository
    });

    const cibilCreditReportsController = new CibilCreditReportsController({
      cibilCreditReportsService
    });

    const experianCreditReportsRepository = new ExperianCreditReportsRepository();
    await experianCreditReportsRepository.validateSchema();

    const experianCreditReportsService = new ExperianCreditReportsService({
      experianCreditReportsRepository
    });

    const experianCreditReportsController = new ExperianCreditReportsController({
      experianCreditReportsService
    });

    const crifCreditReportsRepository = new CrifCreditReportsRepository();
    await crifCreditReportsRepository.validateSchema();

    const crifCreditReportsService = new CrifCreditReportsService({
      crifCreditReportsRepository
    });

    const crifCreditReportsController = new CrifCreditReportsController({
      crifCreditReportsService
    });

    container = {
      authRepository,
      authService,
      authController,
      cibilCreditReportsRepository,
      cibilCreditReportsService,
      cibilCreditReportsController,
      experianCreditReportsRepository,
      experianCreditReportsService,
      experianCreditReportsController,
      crifCreditReportsRepository,
      crifCreditReportsService,
      crifCreditReportsController,
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
