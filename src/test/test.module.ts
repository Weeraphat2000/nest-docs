import { Global, Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';

@Global() // ถ้าทำเป็น global ก็ไม่ต้อง imoprt เข้าของแต่ละ module
@Module({
  controllers: [TestController],
  providers: [TestService],
  exports: [TestService],
})
export class TestModule {}
