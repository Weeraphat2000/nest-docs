import { Module } from '@nestjs/common';
import { PrometheusService } from './prometheus.service';
import { PrometheusController } from './prometheus.controller';
import * as prometheus from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    prometheus.PrometheusModule.register({
      // Configuration options
    }),
  ],
  controllers: [PrometheusController],
  providers: [PrometheusService],
})
export class PrometheusModule {}
