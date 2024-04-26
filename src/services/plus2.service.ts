import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

@Injectable()
export class Plus {
  plus(n: number) {
    return n + 2;
  }

  uuid() {
    return v4();
  }
}
