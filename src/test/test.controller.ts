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
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { Plus } from 'src/services/plus2.service';
import { TestService } from './test.service';
import * as bcrypt from 'bcrypt';
import { BcryptService } from 'src/services/bcrypt.service';
import { Throttle } from '@nestjs/throttler';
import { TestGuard } from './test.guard';
import { TestInterceptor } from './test.interceptor';

@Controller('test')
// @UseGuards(TestGuard) // ถ้าใส่ตรงนี้ก็ use guard ที่ part ทุก method ในนี้เลย ******************
export class TestController {
  constructor(
    private readonly plus: Plus,
    private readonly testService1: TestService,
    private readonly bcryptService: BcryptService,
  ) {}

  @Get('')
  @UseInterceptors(TestInterceptor)
  get(
    @Req() req: Request,
    @Res() res: Response, // ถ้าใช้ @Res() res: Response แล้วก็ต้องใช้ response ในการส่งข้อมูลกลับ จะใช้ return ไม่ได้
    @Body() body: {},
    @Query('id') query: string,
  ) {
    console.log(req.body, 'body request');
    console.log(body, 'body');
    console.log(query, 'Query');
    res.status(HttpStatus.OK).json({ message: 'OK' }); // ถ้าใช้ response ก็ต้องใช้ response จะใช้ return ไม่ได้เพราะว่ามันจะไม่ response
    return { message: 'OK', a: 'A' }; // return จะส่งค่าที่อยู่ใน return กลับไปที่ interceptor
  }

  // @UseGuards(AuthGuard) แค่นี้ก็ใช้งานได้เลย แล้วก็ต้องทำตามที่มันทให้ทำด้วย(ใน AuthGuard)
  // Guard เอาไว้ทำเฉพาะ authendicate
  @UseGuards(AuthGuard)
  @Get('guard')
  testGurad(@Req() req: Request) {
    console.log(req['user'], 'user controller');
    console.log(req['hun'], 'hun controller');
    return { user: req['user'], token: req['token'] };
  }

  // เข้า middleware ก่อนแล้วค่อยเข้ามาที่ guard
  // @UseGuards(TestGuard)
  @Get('/middleware')
  middleware(@Req() req: Request, @Res() res: Response) {
    console.log('test middleware');
    return res.status(HttpStatus.OK).json({ data: req.body });
  }

  @Get('/plus/:id')
  testService(@Param('id', ParseIntPipe) id: number) {
    return {
      n: this.plus.plus(id),
      uuid: this.plus.uuid(),
      test: this.testService1.test(id),
    };
  }

  // @Throttle({ default: { limit: 3, ttl: 60000 } }) // late limit
  @Get('bcrypt-hash')
  async bcrypt() {
    const password = 'password';
    const hash = await this.bcryptService.hash(password);
    console.log(hash, 'hash');
    return { hash };
  }
  @Get('bcrypt-compare/:password')
  async compare(@Param('password') password: string) {
    const isMatch = await this.bcryptService.compare(password);
    console.log(isMatch, 'isMatch');
    return { isMatch };
  }
}
