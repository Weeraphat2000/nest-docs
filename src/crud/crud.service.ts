import { Injectable } from '@nestjs/common';
import { CreateCrudDto } from './dto/create-crud.dto';
import { UpdateCrudDto } from './dto/update-crud.dto';
import { v4 } from 'uuid';

@Injectable()
export class CrudService {
  private user: CreateCrudDto[] = [
    {
      username: 'hun',
      age: 12,
      address: 'BKK',
      id: 'cce78512-0055-4c23-a07b-b9fe32cdcd65',
    },
  ];
  create(createCrudDto: CreateCrudDto) {
    console.log(v4());
    return this.user.push({ ...createCrudDto, id: v4() });
  }

  findAll() {
    return this.user;
  }

  findOne(id: string) {
    return this.user.find((item) => item.id == id);
  }

  update(id: string, updateCrudDto: UpdateCrudDto) {
    this.user = this.user.map((item) =>
      item.id == id ? { ...item, ...updateCrudDto } : item,
    );
    return this.user;
  }

  remove(id: string) {
    this.user = this.user.filter((item) => item.id !== id);
    console.log(this.user);
    return this.user;
  }
}
/*
 this.prismaService.user.findMany({
  include: { Order: { where: { amount } } },
      // amount คือ ค่าที่ต้องการเปรียบเทียบ และเป็นตัวเลขที่ต้องการเปรียบเทียบ
      // include: { Order: { where: { amount: { lte: amount } } } },
      // lte คือ less than or equal
      // lt คือ less than
      // gte คือ greater than or equal
      // gt คือ greater than
      // include: { Order: { where: { amount: { lt: amount } } } },
      take: 5,
    });
*/
