import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { getFullEnv } from '@/env/configs';

const { databaseFile, drizzleMigationFolder, drizzleSchemaFiles } = getFullEnv()

export default defineConfig({
  out: drizzleMigationFolder,
  schema: drizzleSchemaFiles,
  dialect: 'sqlite',
  dbCredentials: {
    url: databaseFile,
  },
});