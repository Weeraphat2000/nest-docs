import { Module } from '@nestjs/common';
import { ConstructorsController } from './constructors.controller';
import { ConstructorsService } from './constructors.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConstructorsService2 } from './constructors2.service';

@Module({
  controllers: [ConstructorsController],
  providers: [ConstructorsService, ConstructorsService2],
  imports: [PrismaModule],
})
export class ConstructorsModule {}
