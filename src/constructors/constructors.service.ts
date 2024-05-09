import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ConstructorsService {
  constructor(protected readonly prismaService: PrismaService) {}
  protected user = [{ user: 'hun', age: 11 }];

  one(name: string) {
    this.user.push({ age: 12, user: 'hun2' });
    console.log(this.user);
    return this.prismaService.user.findFirst({ where: { name } });
  }

  test() {
    return this.prismaService.user.create({
      data: {
        name: 'asdf',
        description: 'asdf',
        password: 'asdf',
      },
    });
  }
}
