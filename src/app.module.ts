import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CrudModule } from './crud/crud.module';
import { PrismaService } from './prisma/prisma.service';
import { TestModule } from './test/test.module';

@Module({
  imports: [CrudModule, TestModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
