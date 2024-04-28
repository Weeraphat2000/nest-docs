import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class TestGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('guard test'.toUpperCase());
    const req = context.switchToHttp().getRequest() as Request; // ****************** เอาเรื่องวะ *******
    console.log(req.body, 'request body at guard');
    return true; // ถ้าเป็น true จะให้ไปต่อ ถ้าเป็น false จะไม่ได้ไปต่อ
  }
}

// เข้า middleware ก่อนแล้วค่อยเข้ามาที่ guard
