import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  test(id: number) {
    return 'TestService' + id;
  }
}
