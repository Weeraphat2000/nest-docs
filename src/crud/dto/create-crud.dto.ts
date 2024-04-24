import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
export class CreateCrudDto {
  id: string;

  @IsString()
  username: string;
  @IsNumber()
  @IsPositive()
  age: number;

  // @IsOptional() คือ ส่งเข้ามาก็ได้ไม่ส่งเข้ามาก็ได้
  @IsString()
  address: string;
}

/*
  @IsNotEmpty({message:''})

  @Length(10, 20)
  title: string;

  @Contains('hello')
  text: string;

  @IsInt()
  @Min(0)
  @Max(10)
  rating: number;

  @IsEmail()
  email: string;

  @IsDate()
  createDate: Date;

  @IsPositive()

  @Length(10, 20, { message: '10 - 20' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'password minimum eight characters, at least one letter and one number',
  })

  @Matches('ADMIN')
  @IsNotEmpty({ message: 'role is not empty' })
  role: 'ADMIN';

  @IsEnum(['user', 'admin'], {message:"errrorrrrrr"})
  role: string;

  @IsString()
  @IsNotEmpty({ message: 'password is not empty' })
  password: string;

  @IsString()
  @Equals('password', { message: 'password and confirm password not match' }) // password == confrimPassword ไหม
  confirmPassword: string;

  @IsNumberString() เป็น number ที่เป็น str ไหม

  @IsOptional() คือ ส่งเข้ามาก็ได้ไม่ส่งเข้ามาก็ได้
*/
