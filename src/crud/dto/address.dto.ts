import { IsNotEmpty } from 'class-validator';

export class CreateAddressDTO {
  @IsNotEmpty()
  A: string;

  @IsNotEmpty()
  B: string;

  @IsNotEmpty()
  C: number;
}
