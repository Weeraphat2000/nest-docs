import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TestService {
  test(id: number) {
    return 'TestService' + id;
  }

  @Cron('45 * * * * *') // การตั้งเวลางาน เป็นกระบวนการในการกำหนดเวลาให้กับงานที่ต้องทำงานอัตโนมัติตามเวลาที่กำหนดไว้ ซึ่งมีวัตถุประสงค์หลักคือให้สามารถทำงานเองโดยอัตโนมัติตามเวลาที่กำหนด โดยไม่ต้องมีการเรียกใช้งานจากผู้ใช้ในแต่ละครั้ง
  schedule() {
    console.log('print hun every 45s');
  }
}
