import { db } from '../config/db.js';

export class CrifCreditReportsRepository {
  async validateSchema() {
    const [rows] = await db.query('SHOW COLUMNS FROM crif_credit_reports_avs');
    const columns = new Set(rows.map((row) => row.Field));
    const requiredColumns = [
      'id',
      'user_id',
      'name',
      'pan',
      'mobile',
      'credit_report_link',
      'created_at'
    ];
    const missing = requiredColumns.filter((column) => !columns.has(column));

    if (missing.length > 0) {
      const error = new Error(`Invalid crif_credit_reports_avs table schema. Missing: ${missing.join(', ')}`);
      error.statusCode = 500;
      throw error;
    }
  }

  async findPaginatedByUserId({ userId, limit, offset }) {
    const [rows] = await db.execute(
      `
        SELECT
          id,
          name,
          pan,
          mobile,
          credit_report_link,
          created_at
        FROM crif_credit_reports_avs
        WHERE user_id = ?
        ORDER BY id DESC
        LIMIT ? OFFSET ?
      `,
      [userId, limit, offset]
    );

    return rows;
  }

  async countByUserId(userId) {
    const [rows] = await db.execute(
      'SELECT COUNT(*) AS total FROM crif_credit_reports_avs WHERE user_id = ?',
      [userId]
    );

    return Number(rows[0].total);
  }
}
