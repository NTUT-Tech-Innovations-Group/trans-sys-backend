import axios from 'axios';
import './MapInterface';

export class ComputeRoutesAPI {
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
