import { IsNumberString } from 'class-validator';
export class ParamsDto {
  @IsNumberString()
  id: string;
}
