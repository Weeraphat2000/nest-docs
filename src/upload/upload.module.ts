import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { APP_FILTER } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';

@Module({
  controllers: [UploadController],
  providers: [UploadService],
  imports: [
    MulterModule.register({
      dest: './uploads',
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, './uploads'); // กำหนด directory ที่ต้องการบันทึกไฟล์
        },
        filename: (req, file, cb) => {
          cb(null, file.originalname); // กำหนดชื่อไฟล์ที่ต้องการ
        },
      }),
    }),
  ],
})
export class UploadModule {
  // configure(cunsumer: MiddlewareConsumer) {
  //   cunsumer
  //     .apply(MulterMiddleware)
  //     .forRoutes({ path: '/upload/upload2', method: RequestMethod.POST });
  // }
}
