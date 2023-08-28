/* eslint-disable @typescript-eslint/no-unused-vars */
const COMPUTE_ROUTES_URL: string =
  'https://routes.googleapis.com/directions/v2:computeRoutes';
const GOOGLE_MAP_KEY: string = 'AIzaSyBhZ2bJSk1ARoJ2HrsOzG7azXc1YB4lNn8';
const FIELD_MASK: string =
  'routes.distanceMeters,routes.duration,routes.legs.stepsOverview.multiModalSegments.navigationInstruction,routes.legs.stepsOverview.multiModalSegments.travelMode,routes.legs.steps.distanceMeters,routes.legs.steps.navigationInstruction,routes.legs.steps.travelMode,routes.legs.steps.transitDetails.stopDetails.arrivalStop.name,routes.legs.steps.transitDetails.stopDetails.departureStop.name,routes.legs.steps.transitDetails.transitLine.name,routes.legs.steps.transitDetails.transitLine.vehicle.name,routes.legs.steps.transitDetails.transitLine.vehicle.type';

type LatLng = {
  latitude: number;
  longitude: number;
};

type Locate = {
  latLng: LatLng;
};

type Place = {
  location: Locate;
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
