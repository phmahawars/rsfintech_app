export class ExperianCreditReportsService {
  constructor({ experianCreditReportsRepository }) {
    this.experianCreditReportsRepository = experianCreditReportsRepository;
  }

  async getReports({ userId, page, limit }) {
    const offset = (page - 1) * limit;
    const [reports, total] = await Promise.all([
      this.experianCreditReportsRepository.findPaginatedByUserId({ userId, limit, offset }),
      this.experianCreditReportsRepository.countByUserId(userId)
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
