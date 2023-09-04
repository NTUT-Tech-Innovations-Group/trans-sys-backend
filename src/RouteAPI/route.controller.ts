import { Body, Controller, Get, Post } from '@nestjs/common';
import { routeService } from './route.service';
import { Result, RouteDto } from 'src/interfaces';

@Controller('routes')
export class routeController {
  constructor(private readonly googleMapService: routeService) {}

  @Post('route')
  getOverview(@Body() dto: RouteDto): Promise<Result> {
    return this.googleMapService.getOverview(dto);
  }
}
