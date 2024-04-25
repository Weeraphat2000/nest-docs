import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CrudModule } from './crud/crud.module';
import { PrismaService } from './prisma/prisma.service';
import { TestModule } from './test/test.module';
import { ScheduleModule } from '@nestjs/schedule';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [CrudModule, TestModule, ScheduleModule.forRoot(), UploadModule],
  // ScheduleModule คือ  การตั้งเวลางาน เป็นกระบวนการในการกำหนดเวลาให้กับงานที่ต้องทำงานอัตโนมัติตามเวลาที่กำหนดไว้ ซึ่งมีวัตถุประสงค์หลักคือให้สามารถทำงานเองโดยอัตโนมัติตามเวลาที่กำหนด โดยไม่ต้องมีการเรียกใช้งานจากผู้ใช้ในแต่ละครั้ง
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
