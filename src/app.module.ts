import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CrudModule } from './crud/crud.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [CrudModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
