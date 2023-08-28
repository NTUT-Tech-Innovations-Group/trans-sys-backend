import { Injectable } from '@nestjs/common';
import { ComputeRoutesAPI } from './google-map-API';
import './MapInterface';

const GOOGLE_MAP_KEY: string = 'AIzaSyBhZ2bJSk1ARoJ2HrsOzG7azXc1YB4lNn8';
const FIELD_MASK: string =
  'routes.distanceMeters,routes.duration,routes.legs.stepsOverview.multiModalSegments.navigationInstruction,routes.legs.stepsOverview.multiModalSegments.travelMode,routes.legs.steps.distanceMeters,routes.legs.steps.navigationInstruction,routes.legs.steps.travelMode,routes.legs.steps.transitDetails.stopDetails.arrivalStop.name,routes.legs.steps.transitDetails.stopDetails.departureStop.name,routes.legs.steps.transitDetails.transitLine.name,routes.legs.steps.transitDetails.transitLine.vehicle.name,routes.legs.steps.transitDetails.transitLine.vehicle.type';

const header: RequestHeader = {
  'X-Goog-Api-Key': GOOGLE_MAP_KEY,
  'Content-Type': 'application/json',
  'X-Goog-FieldMask': FIELD_MASK,
};

@Injectable()
export class GoogleMapService {
  async getOverview(): Promise<string[][]> {
    const body: RequestBody = {
      origin: {
        location: {
          latLng: {
            latitude: 25.048611088953038,
            longitude: 121.51685493128674,
          },
        },
      },
      destination: {
        location: {
          latLng: {
            latitude: 25.042611925171517,
            longitude: 121.56383226466977,
          },
        },
      },
      travelMode: 'TRANSIT',
      computeAlternativeRoutes: true,
      languageCode: 'zh-TW',
      units: 'IMPERIAL',
    };

    const computeRoutesApi = new ComputeRoutesAPI(body, header);
    const response = await computeRoutesApi.getRoutes();
    const result: string[][] = [];

    response.routes.forEach((route) => {
      route.legs.forEach((leg) => {
        const travelmodes: string[] = [];
        leg.stepsOverview.multiModalSegments.forEach((seg) => {
          travelmodes.push(seg.travelMode);
        });
        result.push(travelmodes);
      });
    });

    return result;
  }
}
