import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { JasaModule } from './jasa/jasa.module';

@Module({
  imports: [PrismaModule, JasaModule],
})
export class AppModule {}
