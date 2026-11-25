import 'dotenv/config';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors(); // agar frontend React bisa memanggil API
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
  );
  // Halaman frontend sederhana di http://localhost:3000 (folder public/)
  app.useStaticAssets(join(__dirname, '..', 'public'));
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`API berjalan di http://localhost:${port}`);
}
bootstrap();