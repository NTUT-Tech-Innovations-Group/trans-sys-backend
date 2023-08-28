import { Controller, Get } from '@nestjs/common';
import { GoogleMapService } from './google-map.service';
@Controller('google-map')
export class GoogleMapController {
  constructor(private readonly googleMapService: GoogleMapService) {}

  @Get()
  test(): string {
    return this.googleMapService.test();
  }
}
