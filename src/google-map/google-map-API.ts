import axios from 'axios';
import { RequestBody, RequestHeader, RouteAPIResponse } from '../interfaces';

const COMPUTE_ROUTES_URL: string =
  'https://routes.googleapis.com/directions/v2:computeRoutes';

export class ComputeRoutesAPI {

  constructor(private body: RequestBody, private header: RequestHeader) {}

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
