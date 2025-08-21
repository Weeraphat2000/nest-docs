import { Injectable } from '@nestjs/common';
import { CreatePrometheusDto } from './dto/create-prometheus.dto';
import { UpdatePrometheusDto } from './dto/update-prometheus.dto';

@Injectable()
export class PrometheusService {
  create(createPrometheusDto: CreatePrometheusDto) {
    return 'This action adds a new prometheus';
  }

  findAll() {
    return `This action returns all prometheus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} prometheus`;
  }

  update(id: number, updatePrometheusDto: UpdatePrometheusDto) {
    return `This action updates a #${id} prometheus`;
  }

  remove(id: number) {
    return `This action removes a #${id} prometheus`;
  }
}
