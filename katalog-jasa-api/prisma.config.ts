import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    // Fallback agar `prisma generate` (saat npm install) tetap jalan walau .env belum ada.
    // Untuk migrate/seed/server, DATABASE_URL tetap diambil dari file .env.
    url:
      process.env.DATABASE_URL ??
      'postgresql://postgres:postgres@localhost:5432/katalog_jasa?schema=public',
  },
});
