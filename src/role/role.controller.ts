import { Controller, Get, UseGuards } from '@nestjs/common';

import { Role } from './role.decorector';
import { Roles } from './role.enum';
import { RolesGuard } from './role.guard';

@Controller('role')
export class RoleController {
  @Get()
  @UseGuards(RolesGuard)
  @Role(Roles.ADMIN)
  role() {
    console.log('first');
    return 'test role pass';
  }
}
