export class CrifCreditReportsService {
  constructor({ crifCreditReportsRepository }) {
    this.crifCreditReportsRepository = crifCreditReportsRepository;
  }

  async getReports({ userId, page, limit }) {
    const offset = (page - 1) * limit;
    const [reports, total] = await Promise.all([
      this.crifCreditReportsRepository.findPaginatedByUserId({ userId, limit, offset }),
      this.crifCreditReportsRepository.countByUserId(userId)
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
