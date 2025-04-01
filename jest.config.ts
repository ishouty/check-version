import type { Config } from 'jest';
import { getJestProjectsAsync } from '@nx/jest';

export default async (): Promise<Config> => ({
  projects: await getJestProjectsAsync(),
  // Add the setupFilesAfterEnv property here
  setupFilesAfterEnv: ['./setup-tests.ts'],
});
