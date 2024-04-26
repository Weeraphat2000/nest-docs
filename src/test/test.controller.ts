import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { Plus } from 'src/services/plus2.service';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(
    private readonly plus: Plus,
    private readonly testService1: TestService,
  ) {}

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

  @UseGuards(AuthGuard)
  @Get('guard')
  testGurad(@Req() req: Request) {
    console.log(req['user']);
    return { user: req['user'], token: req['token'] };
  }

  @Get('/plus/:id')
  testService(@Param('id', ParseIntPipe) id: number) {
    return {
      n: this.plus.plus(id),
      uuid: this.plus.uuid(),
      test: this.testService1.test(id),
    };
  }
}
