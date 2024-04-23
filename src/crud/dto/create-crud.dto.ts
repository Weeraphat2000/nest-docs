import { IsNumber, IsPositive, IsString } from 'class-validator';
export class CreateCrudDto {
  id: string;

  @IsString()
  username: string;
  @IsNumber()
  @IsPositive()
  age: number;
  @IsString()
  address: string;
}
