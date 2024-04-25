import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as multer from 'multer';

@Injectable()
export class MulterMiddleware implements NestMiddleware {
  private upload = multer({
    dest: './uploads', // กำหนด directory ที่ต้องการบันทึกไฟล์
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, './uploads'); // กำหนด directory ที่ต้องการบันทึกไฟล์
      },
      filename: (req, file, cb) => {
        cb(
          null,
          //file.originalname
          new Date().getTime() +
            '' +
            Math.round(Math.random() * 1000000000) +
            '.' +
            file.mimetype.split('/')[1],
        ); // กำหนดชื่อไฟล์ที่ต้องการ
      },
    }),
  });

  use(req: Request, res: Response, next: NextFunction) {
    // ใช้ Multer middleware ในการจัดการอัปโหลดไฟล์
    // this.upload.single('file')(req, res, next);
    // this.upload.single('img')(req, res, next);
    this.upload.fields([{ name: 'img' }])(req, res, next);
  }
}
// const multer = require("multer")
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "public/images")
//     },
//     filename: (req, file, cb) => {
//         cb(null, new Date().getTime() + "" + Math.round(Math.random() * 1000000000) + "." + file.mimetype.split("/")[1])
//     },
// })

// module.exports = multer({ storage })
