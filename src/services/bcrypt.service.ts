import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  async hash(password: string): Promise<string> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }

  async compare(password: string): Promise<boolean> {
    //  Promise<boolean> หรือ Observable<boolean> ก็ได้ครับ
    const isMatch = await bcrypt.compare(
      password,
      '$2b$10$zf9qpQZEEeqb.NeEAML9RO4p6Bqls2sHCXsTNcKnIqeI3pjpUTd36',
    );
    return isMatch;
  }
}
