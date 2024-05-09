import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  // ต้องใช้ชื่อ canActivate นี้ด้วย
  // context: ExecutionContext ต้องทำนี่ด้วย เพราะว่ารับ request ไม่ได้

  //   เมื่อคุณสร้าง AuthGuard แล้ว คุณจะต้องมีเมธอด canActivate ที่รับ ExecutionContext เป็นพารามิเตอร์ เมื่อมีการเรียกใช้งานเมธอดนี้ คุณจะต้องตรวจสอบข้อมูลของ request หรือ context เพื่อตรวจสอบการอนุญาตในแต่ละ request แล้วคืนค่าเป็น true หากอนุญาต หรือ false หากไม่อนุญาต หรือคืนค่าเป็น Promise<boolean> หรือ Observable<boolean> ก็ได้ครับ

  //   ใน NestJS AuthGuard จำเป็นต้องมีเมธอดชื่อ canActivate ซึ่งเป็นส่วนหนึ่งของ CanActivate interface ซึ่งเป็นมาตรฐานสำหรับ guard ใน NestJS และมันต้องคืนค่าเป็น boolean หรือ Promise หรือ Observable ที่สร้างมาจาก boolean ตามที่กล่าวไว้ครับ ดังนั้น การตรวจสอบการอนุญาตใน AuthGuard จะต้องอยู่ใน canActivate และคืนค่าเป็น boolean ตามผลการตรวจสอบครับ
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader12(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'a',
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
      request['token'] = token;
      request['hun'] = 'hun';
      console.log('___from guard___');
      console.log(token, '___token from guard___');
      console.log('___from guard___');
    } catch {
      throw new UnauthorizedException();
    }
    return true;
    // ถ้า return false จะไม่ให้เข้าไปทำงานที่ controller
    // ถ้า return true จะให้เข้าไปทำงานที่ controller
  }

  private extractTokenFromHeader12(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
