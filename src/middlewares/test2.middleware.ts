import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log('.........test2Middleware..............');
  console.log(req.body, 'body');
  console.log(`Request...`);
  console.log(' ');
  next();
}
