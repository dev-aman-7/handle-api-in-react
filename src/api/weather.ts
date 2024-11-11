import useInterceptor from "../utils/axios";
import { API_CONFIG } from "./apiConfig";

export class WeatherApi {
  private axiosInstance;

  constructor() {
    this.axiosInstance = useInterceptor();
  }

  private createUrl(
    path: string,
    searchParams?: Record<string, string | number>
  ): string {
    let pathTemp = "";
    if (path && typeof path === "string") {
      pathTemp = `${API_CONFIG.weatherBaseUrl}${path}`;
    }

    if (searchParams && Object.keys(searchParams).length > 0) {
      const params = new URLSearchParams(
        searchParams as Record<string, string>
      );
      return `${pathTemp}?${params.toString()}`;
    }

    return pathTemp;
  }

  async fetchWeatherData(
    path: string,
    searchParams?: Record<string, string | number>
  ) {
    const url = this.createUrl(path, searchParams);
    try {
      const response = await this.axiosInstance(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
