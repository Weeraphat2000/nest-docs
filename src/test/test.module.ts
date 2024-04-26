import { Global, Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { Plus } from 'src/services/plus2.service';
import { BcryptService } from 'src/services/bcrypt.service';

@Global() // ถ้าทำเป็น global ก็ไม่ต้อง imoprt เข้าของแต่ละ module
@Module({
  controllers: [TestController],
  providers: [
    TestService,
    JwtService,
    Plus,
    BcryptService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
  exports: [TestService],
})
export class TestModule {}
