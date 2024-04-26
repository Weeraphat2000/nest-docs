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
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
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
      console.log(token, '___token from guard___');
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader12(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
