import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  //
  //
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalPipes(new ValidationPipe()) จะทำให้เราไม่ต้องระบุการ validate ข้อมูลในแต่ละ Controller หรือในแต่ละเส้นทางของการส่งข้อมูลเองแล้ว แต่จะทำการ validate ทุก DTO อัตโนมัติ
  //
  //
  //
  //
  // const app = await NestFactory.create(AppModule, { cors: true }); cors:true ก็ได้เหมือนกัน
  // app.use(cors()); // ต้องใช้นี่ด้วย
  // app.enableCors(); // เหมือนใช้ cors ของ express
  // ใน Nest.js, app.enableCors() และ app.use(cors()) มีหน้าที่เหมือนกัน คือการเปิดใช้งาน CORS (Cross-Origin Resource Sharing) เพื่ออนุญาตให้แอปพลิเคชันของคุณรับคำขอจากโดเมนอื่น ๆ โดยที่มีโดเมนต่างกัน
  //
  //
  // app.setGlobalPrefix('api') // คือ ทุก parth ต้องมี api
  //
  //
  const authGuard = app.get(AuthGuard);
  app.useGlobalGuards(authGuard); // ทำให้ทุก controller ต้องผ่าน guard ก่อนเข้า controller
  // การใช้งาน guard แบบ global จะทำให้ทุก controller ต้องผ่าน guard ก่อนเข้า controller ทุกครั้ง
  // app.useGlobalGuards(new AuthGuard()); // ทำให้ทุก controller ต้องผ่าน guard ก่อนเข้า controller
  //
  //
  //

  await app.listen(3000);
}
bootstrap();

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiaHVuIiwiaWF0IjoxNzE3NjUwMDYzfQ.C1sjck0mrYQItahl5icN9Eb2wVmoP4bIjy5uznRRfBs
