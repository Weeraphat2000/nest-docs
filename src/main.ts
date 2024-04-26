import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

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
  // app.setGlobalPrefix('api') // คือ ทุก parth ต้องมี api
  //
  //
  await app.listen(3000);
}
bootstrap();
