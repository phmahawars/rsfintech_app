import { successResponse } from '../utils/response.js';

export class CrifCreditReportsController {
  constructor({ crifCreditReportsService }) {
    this.crifCreditReportsService = crifCreditReportsService;
  }

  list = async (req, res, next) => {
    try {
      const data = await this.crifCreditReportsService.getReports({
        ...req.query,
        userId: req.user.id
      });
      return successResponse(res, 200, 'CRIF credit reports fetched successfully', data);
    } catch (error) {
      return next(error);
    }
  };
}
