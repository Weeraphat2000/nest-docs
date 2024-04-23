import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

export interface CustomRequest extends Request {
  user?: {
    username: string;
    age: number;
    address: string;
  }; // เพิ่ม property 'user' ใน Request
  token: string;
}

@Injectable()
export class Authenticate implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const token = this.jwtService.sign({ user: 'hun' });
      console.log(token, 'authen middleware');
      req.token = token;
      next();
    } catch (error) {
      throw new NotFoundException('token is wrong');
    }
  }
}
