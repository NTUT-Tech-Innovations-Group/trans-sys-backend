import { Body, Injectable } from '@nestjs/common';
import { routesAPI } from './routeAPI';
import { RequestBody, RequestHeader, Result, RouteDto } from '../interfaces';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class routeService {
  constructor(private configService: ConfigService) {}

  async getOverview(@Body() dto: RouteDto): Promise<Result> {
    const header: RequestHeader = {
      'X-Goog-Api-Key': this.configService.get<string>('GOOGLE_MAP_KEY'),
      'Content-Type': 'application/json',
      'X-Goog-FieldMask':
        'routes.distanceMeters,routes.duration,routes.legs.stepsOverview.multiModalSegments.navigationInstruction,routes.legs.stepsOverview.multiModalSegments.travelMode,routes.legs.steps.distanceMeters,routes.legs.steps.navigationInstruction,routes.legs.steps.travelMode,routes.legs.steps.transitDetails.stopDetails.arrivalStop.name,routes.legs.steps.transitDetails.stopDetails.departureStop.name,routes.legs.steps.transitDetails.transitLine.name,routes.legs.steps.transitDetails.transitLine.vehicle.name,routes.legs.steps.transitDetails.transitLine.vehicle.type',
    };

    const body: RequestBody = {
      origin: {
        location: {
          latLng: {
            latitude: dto.start.lat,
            longitude: dto.start.lon,
          },
        },
      },
      destination: {
        location: {
          latLng: {
            latitude: dto.end.lat,
            longitude: dto.end.lon,
          },
        },
      },
      travelMode: 'TRANSIT',
      computeAlternativeRoutes: true,
      languageCode: 'zh-TW',
      units: 'IMPERIAL',
    };

    const computeRoutesApi = new routesAPI(body, header);
    const response = await computeRoutesApi.getRoutes();
    const result: Result = { Routes: [] };
    response.routes.forEach((route, routeIndex) => {
      result.Routes.push({ stations: [], time: '' });
      route.legs.forEach((leg) => {
        leg.steps.forEach((step) => {
          console.log(step)
          if (step.travelMode == 'WALK') {
            result.Routes[routeIndex].stations.push({
              station: {
                type: step.travelMode,
                description: step.navigationInstruction?.instructions,
              },
            });
          } else if ((step.travelMode = 'TRANSIT')) {
            result.Routes[routeIndex].stations.push({
              station: {
                type: step.transitDetails.transitLine.vehicle.type,
                description: step.navigationInstruction.instructions,
                transitDetail: {
                  name: step.transitDetails.transitLine.name,
                  departure: step.transitDetails.stopDetails.departureStop.name,
                  arrival: step.transitDetails.stopDetails.arrivalStop.name,
                },
              },
            });
          }
        });
        result.Routes[routeIndex].time = leg.duration;
      });
    });

    return result;
  }
}
