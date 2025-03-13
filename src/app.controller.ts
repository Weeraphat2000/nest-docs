import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { TestValidateDto } from './dto';
import { log } from 'console';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/testValidate')
  postHello(@Body() body: TestValidateDto) {
    log(body);
    log('body', body.role);
    return body;
  }
}
