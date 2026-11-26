import fs from 'node:fs';
import path from 'node:path';
import { TestUser } from './testData';

export function saveTestUser(user: TestUser): void {
  const filePath = path.resolve('test-user.json');

  fs.writeFileSync(
    filePath,
    JSON.stringify(user, null, 2),
    { mode: 0o600 }
  );

  console.log('Test account saved locally');
}