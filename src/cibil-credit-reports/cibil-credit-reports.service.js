export class CibilCreditReportsService {
  constructor({ cibilCreditReportsRepository }) {
    this.cibilCreditReportsRepository = cibilCreditReportsRepository;
  }

  async getReports({ userId, page, limit }) {
    const offset = (page - 1) * limit;
    const [reports, total] = await Promise.all([
      this.cibilCreditReportsRepository.findPaginatedByUserId({ userId, limit, offset }),
      this.cibilCreditReportsRepository.countByUserId(userId)
    ]);
    const totalPages = Math.ceil(total / limit);

    return {
      reports,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
      }
    };
  }
}
