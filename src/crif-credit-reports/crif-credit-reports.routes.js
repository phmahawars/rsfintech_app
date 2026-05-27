import { Router } from 'express';
import { authenticate } from '../auth/auth.middleware.js';
import { getContainer } from '../bootstrap/container.js';
import { paginationSchema, validateQuery } from './crif-credit-reports.validation.js';

const router = Router();

const getCrifCreditReportsController = (next) => {
  try {
    return getContainer().crifCreditReportsController;
  } catch (error) {
    next(error);
    return null;
  }
};

router.get('/', authenticate, validateQuery(paginationSchema), (req, res, next) => {
  const controller = getCrifCreditReportsController(next);
  return controller ? controller.list(req, res, next) : null;
});

export default router;
