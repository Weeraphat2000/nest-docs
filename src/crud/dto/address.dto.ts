import { IsNotEmpty, IsNumber, Max } from 'class-validator';

export class CreateAddressDTO {
  @IsNotEmpty()
  A: string;

  @IsNotEmpty()
  B: string;

  @IsNotEmpty()
  @IsNumber()
  @Max(50, { message: 'C must be less than or equal to 50' })
  C: number;
}
