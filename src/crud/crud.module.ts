import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CrudService } from './crud.service';
import { CrudController } from './crud.controller';
import { TestMiddleware } from 'src/middlewares/test.middleware';
import { logger } from 'src/middlewares/test2.middleware';
import { JwtModule } from '@nestjs/jwt';
import { Authenticate } from 'src/services/authendication.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CrudController],
  providers: [CrudService],
  imports: [
    JwtModule.register({
      secret: 'a', // กำหนดค่า SECRET_KEY ที่นี่
      // signOptions: { expiresIn: '1h' }, // ตั้งค่าอื่น ๆ ตามต้องการ
    }),
    PrismaModule,
  ],
})
export class CrudModule implements NestModule {
  configure(cunsumer: MiddlewareConsumer) {
    cunsumer
      .apply(TestMiddleware, logger)
      .forRoutes({ path: '/crud', method: RequestMethod.ALL });

    cunsumer
      .apply(Authenticate)
      .forRoutes({ path: '/crud/auth/auth', method: RequestMethod.GET });
  }
}
