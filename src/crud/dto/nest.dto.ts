import { IsNotEmpty, IsNotEmptyObject, ValidateNested } from 'class-validator';
import { CreateAddressDTO } from './address.dto';
import { Type } from 'class-transformer';

export class TestNestDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmptyObject()
  @ValidateNested() // ต้องระบุเพื่อให้มัน nest ลงไป validate
  @Type(() => CreateAddressDTO) // ต้องมีเพื่อระบุได้ว่าขายอะไรไป และมันจะเช็ค nest ด้วย
  address: CreateAddressDTO;
}
