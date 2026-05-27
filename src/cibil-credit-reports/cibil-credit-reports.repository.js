import { db } from '../config/db.js';

export class CibilCreditReportsRepository {
  async validateSchema() {
    const [rows] = await db.query('SHOW COLUMNS FROM cibil_credit_reports');
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
      const error = new Error(`Invalid cibil_credit_reports table schema. Missing: ${missing.join(', ')}`);
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
        FROM cibil_credit_reports
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
      'SELECT COUNT(*) AS total FROM cibil_credit_reports WHERE user_id = ?',
      [userId]
    );

    return Number(rows[0].total);
  }
}
