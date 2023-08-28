import axios from 'axios';

const COMPUTE_ROUTES_URL: string =
  'https://routes.googleapis.com/directions/v2:computeRoutes';

type LatLng = {
  latitude: number;
  longitude: number;
};

type Location = {
  latLng: LatLng;
};

type Place = {
  location: Location;
};

type TravelMode = 'TRANSIT' | 'DRIVE' | 'BICYCLE' | 'WALK' | 'TWO_WHEELER';

type Units = 'IMPERIAL' | 'METRIC';

type RequestBody = {
  origin: Place;
  destination: Place;
  travelMode: TravelMode;
  computeAlternativeRoutes: boolean;
  languageCode: string;
  units: Units;
};
type RequestHeader = {
  'X-Goog-Api-Key': string;
  'Content-Type': 'application/json';
  'X-Goog-FieldMask': string;
};

type NavigationInstruction = {
  maneuver?: string;
  instructions: string;
};

type Step = {
  distanceMeters: number;
  navigationInstruction: NavigationInstruction;
  travelMode: string;
  transitDetails?: {
    // 在這裡定義更多的結構
  };
};

type Leg = {
  steps: Step[];
  stepsOverview: {
    multiModalSegments: {
      navigationInstruction?: NavigationInstruction;
      travelMode: string;
    }[];
  };
  distanceMeters: number;
  duration: string;
};

type Route = {
  legs: Leg[];
  distanceMeters: number;
  duration: string;
};

type RouteAPIResponse = {
  routes: Route[];
};

class ComputeRoutesAPI {
  private body: RequestBody;
  private header: RequestHeader;

  constructor(_body: RequestBody, _header: RequestHeader) {
    this.body = _body;
    this.header = _header;
  }

  async getRoutes(): Promise<RouteAPIResponse> {
    try {
      const response = await axios.post(COMPUTE_ROUTES_URL, this.body, {
        headers: this.header,
      });
      const responseObject = response.data as RouteAPIResponse;
      return responseObject;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}
