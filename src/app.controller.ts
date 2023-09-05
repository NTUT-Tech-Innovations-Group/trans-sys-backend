import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class AppController {
  constructor() {}

  @Get()
  getHttpServer() {
    return 'Hello World!';
  }
}
