import { successResponse } from '../utils/response.js';

export class ExperianCreditReportsController {
  constructor({ experianCreditReportsService }) {
    this.experianCreditReportsService = experianCreditReportsService;
  }

  list = async (req, res, next) => {
    try {
      const data = await this.experianCreditReportsService.getReports({
        ...req.query,
        userId: req.user.id
      });
      return successResponse(res, 200, 'Experian credit reports fetched successfully', data);
    } catch (error) {
      return next(error);
    }
  };
}
