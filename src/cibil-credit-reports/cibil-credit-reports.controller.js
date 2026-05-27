import { successResponse } from '../utils/response.js';

export class CibilCreditReportsController {
  constructor({ cibilCreditReportsService }) {
    this.cibilCreditReportsService = cibilCreditReportsService;
  }

  list = async (req, res, next) => {
    try {
      const data = await this.cibilCreditReportsService.getReports({
        ...req.query,
        userId: req.user.id
      });
      return successResponse(res, 200, 'CIBIL credit reports fetched successfully', data);
    } catch (error) {
      return next(error);
    }
  };
}
