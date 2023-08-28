import { Injectable } from '@nestjs/common';
import { ComputeRoutesAPI } from './google-map-API';
import './MapInterface';

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
    let result: string[][];

    response.routes.forEach((route, routeIndex) => {
      route.legs.forEach((leg) => {
        leg.stepsOverview.multiModalSegments.forEach((seg, segIndex) => {
          result[routeIndex][segIndex] = seg.travelMode;
        });
      });
    });

    return result;
  }
}
