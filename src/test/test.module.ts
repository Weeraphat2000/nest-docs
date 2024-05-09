import {
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { Plus } from 'src/services/plus2.service';
import { BcryptService } from 'src/services/bcrypt.service';
import { TestMiddleware } from './test.middleware';

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
//
// การทำ middleware ควรจะ implements จาก nestmodule
//
export class TestModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TestMiddleware) // เข้า middleware ก่อนแล้วค่อยเข้ามาที่ guard
      .forRoutes(
        { path: 'test/middleware', method: RequestMethod.GET },
        { path: 'test/plus/:id', method: RequestMethod.GET },
      );

    consumer
      .apply(TestMiddleware) // เข้า middleware ก่อนแล้วค่อยเข้ามาที่ guard
      .exclude({ path: 'test/middleware', method: RequestMethod.GET }) // ไม่ให้ middleware ทำงานใน path นี้
      .forRoutes(TestController); // แบบนี้จะได้ทุก method ใน controller นี้เลย
  }
}
