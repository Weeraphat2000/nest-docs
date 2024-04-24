import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Res,
  HttpStatus,
  Req,
  NotFoundException,
  ParseIntPipe,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { CrudService } from './crud.service';
import { CreateCrudDto } from './dto/create-crud.dto';
import { UpdateCrudDto } from './dto/update-crud.dto';
import { Request, Response } from 'express';
import { CustomRequest } from 'src/services/authendication.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TestService } from 'src/test/test.service';

@Controller('crud')
export class CrudController {
  constructor(
    private readonly crudService: CrudService,
    private readonly prismaService: PrismaService,
    private testService: TestService,
  ) {}

  @Get('/testService')
  testservice() {
    console.log('testservice');
    return this.testService.test(123);
  }

  @Post()
  create(@Body(ValidationPipe) createCrudDto: CreateCrudDto) {
    return this.crudService.create(createCrudDto);
  }

  @Get()
  findAll() {
    return this.crudService.findAll();
  }

  @Get('/res')
  testRes(@Res() res: Response, @Req() req: Request) {
    console.log(req, 'req');
    // HttpStatus.OK 200
    // HttpStatus.CREATED 201
    // HttpStatus.ACCEPTED 202
    // HttpStatus.BAD_REQUEST 400
    // HttpStatus.UNAUTHORIZED 401
    // HttpStatus.NOT_FOUND 404
    // HttpStatus.INTERNAL_SERVER_ERROR 500
    return res.status(HttpStatus.OK).json({ message: 'OK' });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const user = this.crudService.findOne(id);
    if (!user) {
      throw new NotFoundException('not found user');
    }
    return user;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCrudDto: UpdateCrudDto,
    @Res() res: Response,
  ) {
    const user = this.crudService.findOne(id);
    if (!user) {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'not found user id' });
      // throw new NotFoundException('not found user'); // บอกระเอียดมากกว่า ข้างบน
    }
    return this.crudService.update(id, updateCrudDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crudService.remove(id);
  }

  @Get('/test/:id')
  test(@Param('id', ParseIntPipe) id: number) {
    console.log(id, 'id');
    return id + 1;
  }

  @Get('/test2/:id')
  test2(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }), // แค่มาเปลี่ยน statusCode เฉยๆ
    )
    id: number,
  ) {
    console.log(id, 'id');
    return id;
  }
  @Get('/test3/:id')
  test3(
    @Param('id', ParseUUIDPipe) // ถ้าไม่ใช่ uuid ที่ส่งเข้ามาก็จะ error
    id: string,
  ) {
    console.log(id, 'id');
    return id;
  }

  @Get('/auth/auth')
  testAuth(@Req() req: CustomRequest) {
    console.log(req.user, 'user get');
    console.log(req.token, 'token get');
    return { token: req.token };
  }

  @Get('/user1/user1')
  getAllUser(@Query() role?: { user: string }, @Query('user') user?: string) {
    console.log(role, '...Query');
    console.log(user, '.....Query User');
    console.log('a');
    return this.prismaService.user.findMany();
  }
}
