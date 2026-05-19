import { db } from '../config/db.js';

export class AuthRepository {
  constructor() {
    this.columns = null;
  }

  async getColumns() {
    if (this.columns) {
      return this.columns;
    }

    const [rows] = await db.query('SHOW COLUMNS FROM users');
    this.columns = new Set(rows.map((row) => row.Field));

    return this.columns;
  }

  async getUserFields() {
    const columns = await this.getColumns();
    const fullnameField = columns.has('fullname') ? '`fullname` AS fullname' : '`name` AS fullname';
    const passwordField = columns.has('password_hash') ? '`password_hash` AS passwordHash' : '`password` AS passwordHash';
    const createdAtField = columns.has('created_at') ? '`created_at` AS createdAt' : 'NULL AS createdAt';
    const updatedAtField = columns.has('updated_at') ? '`updated_at` AS updatedAt' : 'NULL AS updatedAt';

    return [
      '`id`',
      fullnameField,
      '`email`',
      '`phone`',
      passwordField,
      createdAtField,
      updatedAtField
    ].join(', ');
  }

  async findAllUsers() {
    const userFields = await this.getUserFields();

    const [rows] = await db.query(`
      SELECT ${userFields}
      FROM users
      ORDER BY id ASC
    `);

    return rows;
  }

  async findByEmail(email) {
    const userFields = await this.getUserFields();

    const [rows] = await db.execute(
      `SELECT ${userFields} FROM users WHERE email = ? LIMIT 1`,
      [email]
    );

    return rows[0] || null;
  }

  async findByPhone(phone) {
    const userFields = await this.getUserFields();

    const [rows] = await db.execute(
      `SELECT ${userFields} FROM users WHERE phone = ? LIMIT 1`,
      [phone]
    );

    return rows[0] || null;
  }

  async findByEmailOrPhone(identifier) {
    const userFields = await this.getUserFields();

    const [rows] = await db.execute(
      `SELECT ${userFields} FROM users WHERE email = ? OR phone = ? LIMIT 1`,
      [identifier, identifier]
    );

    return rows[0] || null;
  }

  async createUser({ fullname, email, phone, passwordHash }) {
    const columns = await this.getColumns();
    const fullnameColumn = columns.has('fullname') ? '`fullname`' : '`name`';
    const passwordColumn = columns.has('password_hash') ? '`password_hash`' : '`password`';
    const userFields = await this.getUserFields();

    const [result] = await db.execute(
      `
        INSERT INTO users (${fullnameColumn}, email, phone, ${passwordColumn})
        VALUES (?, ?, ?, ?)
      `,
      [fullname, email, phone, passwordHash]
    );

    const [rows] = await db.execute(
      `SELECT ${userFields} FROM users WHERE id = ? LIMIT 1`,
      [result.insertId]
    );

    return rows[0];
  }

  async updatePasswordHash(userId, passwordHash) {
    const columns = await this.getColumns();
    const passwordColumn = columns.has('password_hash') ? '`password_hash`' : '`password`';

    await db.execute(
      `UPDATE users SET ${passwordColumn} = ? WHERE id = ?`,
      [passwordHash, userId]
    );
  }
}
