import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(
    // key = file
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: any, @Req() req: Request) {
    console.log(file);
    console.log(req.file, 'request file');
    return { filename: file.filename };
  }

  @Post('upload2')
  // key = img
  @UseInterceptors(FileInterceptor('img'))
  uploadFile2(@UploadedFile() file: any) {
    console.log(file);
    return { filename: file.filename };
  }

  @Post('/upload3')
  uploadFile3(@UploadedFiles() file: any) {
    console.log(file, 'upload3');
  }
}

// middleware
// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { NextFunction, Request, Response } from 'express';
// import multer from 'multer';

// @Injectable()
// export class MulterMiddleware implements NestMiddleware {
//   private upload = multer({
//     dest: 'uploads/', // กำหนด directory ที่ต้องการบันทึกไฟล์
//     storage: multer.diskStorage({
//       destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // กำหนด directory ที่ต้องการบันทึกไฟล์
//       },
//       filename: (req, file, cb) => {
//         cb(null, file.originalname); // กำหนดชื่อไฟล์ที่ต้องการ
//       }
//     })
//   });

//   use(req: Request, res: Response, next: NextFunction) {
//     // ใช้ Multer middleware ในการจัดการอัปโหลดไฟล์
//     this.upload.single('file')(req, res, next);
//   }
// }
