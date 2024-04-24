import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //
  //
  // app.use(cors()); // ต้องใช้นี่ด้วย
  // app.enableCors(); // เหมือนใช้ cors ของ express
  // ใน Nest.js, app.enableCors() และ app.use(cors()) มีหน้าที่เหมือนกัน คือการเปิดใช้งาน CORS (Cross-Origin Resource Sharing) เพื่ออนุญาตให้แอปพลิเคชันของคุณรับคำขอจากโดเมนอื่น ๆ โดยที่มีโดเมนต่างกัน
  // app.setGlobalPrefix('api') // คือ ทุก parth ต้องมี api
  //
  //
  await app.listen(3000);
}
bootstrap();
