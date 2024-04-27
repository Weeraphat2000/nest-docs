import { Controller, Get } from '@nestjs/common';
import { ConstructorsService2 } from './constructors2.service';

@Controller('constructors')
export class ConstructorsController {
  constructor(private readonly constructorsService2: ConstructorsService2) {}

  @Get('/one')
  one() {
    return this.constructorsService2.one('hun');
  }

  @Get('/all')
  all() {
    return this.constructorsService2.all();
  }
}
