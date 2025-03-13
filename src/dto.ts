import { Type } from 'class-transformer';
import {
  //   ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export class Address {
  @IsString()
  city: string;

  @IsString()
  @IsOptional()
  zip: string;
}

export class TestValidateDto {
  @IsOptional()
  @IsString()
  name1: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  age: number;

  @IsNumber()
  @Min(1)
  @Max(100)
  age1: number;

  @IsEmail()
  email: string;

  @IsBoolean()
  true: boolean;

  @IsEnum(Role)
  role: Role;

  @IsArray()
  // @ArrayNotEmpty({ message: 'Address array should not be empty' })
  @ValidateNested({ each: true })
  @Type(() => Address)
  address: Address[];

  @IsString()
  @IsOptional()
  a: string;
}
