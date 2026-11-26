import dotenv from 'dotenv';
import { randomUUID } from 'node:crypto';

// Load environment variables from project root
dotenv.config();

export interface TestUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export function generateUser(): TestUser {

  const id = randomUUID().replace(/-/g, '').slice(0, 12);

  const phone = process.env.TEST_PHONE?.trim();

  if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
    throw new Error(
      'Please set a valid TEST_PHONE in the project root .env file.'
    );
  }

  return {
    firstName: 'Test',
    lastName: 'Applicant',
    email: `sdet${id}@example.com`,
    phone,
    password: 'Test@123456Aa'
  };
}