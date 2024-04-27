import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConstructorsService } from './constructors.service';
import { Prisma } from '@prisma/client';
import { DefaultArgs, GetFindResult } from '@prisma/client/runtime/library';

@Injectable()
export class ConstructorsService2 extends ConstructorsService {
  constructor(protected readonly prismaService: PrismaService) {
    super(prismaService);
  }

  async all() {
    const many = await this.prismaService.user.findMany();
    const user = this.user;
    return { many, user };
  }
}
