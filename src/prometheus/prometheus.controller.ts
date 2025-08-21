import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { PrometheusService } from './prometheus.service';
import { Response } from 'express';
import { Counter, register } from 'prom-client';

export const counter = new Counter({
  name: 'my_counter',
  help: 'My counter help',
  labelNames: ['method', 'values'],
});

@Controller('prometheus')
export class PrometheusController {
  constructor(private readonly prometheusService: PrometheusService) {}

  @Get('metrics')
  async getMetrics(@Res() res: Response) {
    res.set('Content-Type', 'text/plain');
    res.send(await register.metrics());
  }

  @Post()
  create() {
    counter.inc({
      method: 'post',
      values: 'success',
    });
    return 'post counter success';
  }

  @Get()
  findAll() {
    counter.inc({
      method: 'get',
      values: 'success',
    });
    return 'get counter success';
  }

  @Get(':id')
  findOne(@Param('id') values: string) {
    counter.inc({
      method: 'get',
      values,
    });
    return 'get counter success';
  }

  @Patch(':id')
  update(@Param('id') values: string) {
    counter.inc({
      method: 'patch',
      values,
    });
    return 'patch counter success';
  }

  @Delete(':id')
  remove(@Param('id') values: string) {
    counter.inc({
      method: 'delete',
      values,
    });
    return 'delete counter success';
  }
}
