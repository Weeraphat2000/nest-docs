import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('test')
export class TestController {
  @Get('')
  get(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: {},
    @Query('id') query: string,
  ) {
    console.log(req.body, 'body request');
    console.log(body, 'body');
    console.log(query, 'Query');
    res.status(HttpStatus.OK).json({ message: 'OK' });
  }
}
