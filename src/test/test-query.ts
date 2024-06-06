import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  Max,
} from 'class-validator';

export class testQuery {
  @IsNotEmpty()
  A: string;

  @IsNotEmpty()
  B: string;

  @IsNotEmpty()
  // IsNumberString จะเช็คว่าเป็นตัวเลข ที่เป็น string หรือไม่ แต่ก็จะได้ผลลัพธ์เป็น string ทั้งหมด
  @IsNumberString()
  C: string;
}
