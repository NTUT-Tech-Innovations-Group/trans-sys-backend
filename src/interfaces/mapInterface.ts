type Place = {
  location: {
    latLng: {
      latitude: number;
      longitude: number;
    };
  };
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
    stopDetails: {
      arrivalStop: { name: string };
      departureStop: { name: string };
    };
    transitLine: {
      name: string;
      vehicle: {
        name: { text: string };
        type: string;
      };
    };
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

class RouteDto {
  public readonly start: { lat: number; lon: number };
  public readonly end: { lat: number; lon: number };
  public readonly restrict: { ubike: boolean };
}

class Result {
  public Routes: {
    stations: {
      station: {
        type: string;
        description: string;
        transitDetail?:{
          name:string,
          departure:string,
          arrival:string
        }
      },
    }[],
    time: string,
  }[];
}

export { RouteAPIResponse, RequestBody, RequestHeader, RouteDto, Result };
