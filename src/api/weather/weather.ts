import { API_CONFIG } from "./apiConfig";
import { ApiClient } from "../ApiClient";

export class WeatherApi {
  private apiCient: ApiClient;

  constructor() {
    this.apiCient = new ApiClient(API_CONFIG.weatherBaseUrl);
  }

  async fetchWeatherData(
    path: string,
    searchParams?: Record<string, string | number>
  ) {
    const headers = {
      "Custom-Header": "value",
    };
    try {
      return await this.apiCient.get(path, searchParams, headers);
    } catch (error) {
      throw error;
    }
  }
}
