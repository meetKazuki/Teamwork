import bcrypt from 'bcryptjs';
import { config } from 'dotenv';
import debug from 'debug';
import faker from 'faker'; // eslint-disable-line
import DB from '../config/db';

config();
const DEBUG = debug('DB');

(async () => {
  const client = await DB.getClient();
  try {
    await client.query('BEGIN');
    const insertUser = `
      INSERT INTO users(
        firstname, lastname, email, password, gender,
        job_role, address, department, is_admin
      )
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id
    `;
    const admin = [
      'Teamwork',
      'Support',
      'admin@teamwork.dev',
      bcrypt.hashSync('secretadmin', +process.env.SALT),
      'male',
      faker.name.jobTitle(),
      faker.address.streetAddress(),
      faker.name.jobArea(),
      true,
    ];
    await client.query(insertUser, admin);

    const user = [
      faker.name.firstName(),
      faker.name.lastName(),
      'staff@teamwork.dev',
      bcrypt.hashSync('secretuser', +process.env.SALT),
      'male',
      faker.name.jobTitle(),
      faker.address.streetAddress(),
      faker.name.jobArea(),
      false,
    ];
    await client.query(insertUser, user);

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    DEBUG(error);
    throw error;
  } finally {
    client.release();
    DEBUG('Database seeding completed successfully');
    process.exit();
  }
})();
