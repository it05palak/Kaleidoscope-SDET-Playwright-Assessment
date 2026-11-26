import { randomUUID, randomInt } from 'node:crypto';

export function generateUser() {
  const id = randomUUID().replace(/-/g, '').slice(0, 12);

  return {
    firstName: 'Test',
    lastName: 'Applicant',
    email: `sdet${id}@example.com`,
    phone: `98${randomInt(10000000, 100000000)}`,
    password: 'Test@123456Aa'
  };
}