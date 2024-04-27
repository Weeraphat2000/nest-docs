import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ConstructorsService {
  constructor(protected readonly prismaService: PrismaService) {}

  one(name: string) {
    return this.prismaService.user.findFirst({ where: { name } });
  }
}
