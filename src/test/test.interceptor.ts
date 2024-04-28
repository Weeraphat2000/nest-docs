import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
// ในตัวอย่างนี้เรามี Interceptor ชื่อ TestInterceptor ซึ่งโดยปกติเราจะใช้เพื่อบันทึกข้อมูลหรือการจัดการกับคำขอก่อนที่จะถูกส่งไปยัง Controller หรือ/และ หลังจาก Controller ทำงานเสร็จสิ้นก่อนที่จะส่งคำตอบกลับไปยังไคลเอ็นต์

// การทำ Interceptors ช่วยลดความซับซ้อนใน Controller และช่วยให้โค้ดมีความเป็นระเบียบมากขึ้น เนื่องจากเราสามารถแยกโค้ดที่เกี่ยวกับการบันทึกข้อมูลหรือการจัดการการทำงานกับคำขอได้และนำมาเก็บไว้ใน Interceptor แทนที่จะให้มันประสาทไปทั้งหมดใน Controller ทำให้โค้ดของ Controller มีความสะอาดและง่ายต่อการอ่านและบริหารจัดการได้มากขึ้น
export class TestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // จะเข้ามาทำงานที่ statement ปกติก่อนก่อนจะเข้าไปที่ controller นั้นๆ แล้วหลังจากทำงานที่ controller นั้นๆเสร็จก็จะมาทำที่ return ของ Interceptors ต่อ
    console.log('Before...     (TestInterceptor)');
    // console.log(context.getClass().name, 'name'); // TestInterceptor

    const now = Date.now();
    console.log(now, 'now');

    // return next.handle();
    return next.handle().pipe(
      map((data) => {
        console.log(`After... ${Date.now() - now}ms      (TestInterceptor)`);
        data['hun'] = 'hun'.toUpperCase();
        console.log(data, 'data in interceptor');

        return data;
      }),
    );
    // ในส่วนนี้ next.handle() เป็นการเรียกใช้งานตัวต่อไปในลำดับการทำงานของ Interceptor chain โดยที่ next.handle() จะส่งคำขอไปยัง Controller หรือตัวถัดไปใน Interceptor chain ตามลำดับ เมื่อ Controller หรือ Interceptor ถัดไปทำงานเสร็จสิ้น ก็จะส่งคำตอบกลับมา จากนั้นเราใช้ .pipe() เพื่อทำการประมวลผลกับ Observable ที่ส่งคืนมาจาก next.handle() โดยในที่นี้ใช้ map operator เพื่อทำการปรับแต่งค่าที่ส่งคืนกลับมาจาก Controller หรือ Interceptor ถัดไปให้กับ client โดยเราทำการ log เวลาที่คำขอสิ้นสุดลงมาด้วย console.log() ซึ่งเป็นการวัดเวลาที่ Controller หรือ Interceptor ถัดไปในลำดับทำงานเสร็จสิ้นแล้ว และคืนค่ากลับเหมือนเดิมโดยใช้ return data; โดยที่ data คือค่าที่ได้จาก Controller หรือ Interceptor ถัดไปในลำดับ
  }
}
