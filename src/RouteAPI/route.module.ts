import { Module } from '@nestjs/common';
import { routeController } from './route.controller';
import { routeService } from './route.service';

@Module({
  controllers: [routeController],
  providers: [routeService],
})
export class routeModule {}
