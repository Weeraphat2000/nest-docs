import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class TestMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    req.body = { middleware: 'middleware' };
    console.log('testmiddleware');
    next();
  }
}
