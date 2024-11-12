import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";
import useInterceptor from "../utils/axios";

export class ApiClient {
  private api: AxiosInstance;

  constructor(baseUrl: string) {
    this.api = useInterceptor(axios.create({ baseURL: baseUrl }));
  }

  async get<T>(
    path: string,
    params?: Record<string, string | number>,
    headers?: Record<string, string>
  ): Promise<T> {
    const url = this.createUrl(path, params);
    const config: AxiosRequestConfig = headers ? { headers } : {};

    try {
      const response: AxiosResponse<T> = await this.api.get(url, config);
      return response.data;
    } catch (error: unknown) {
      throw this.handleError(error);
    }
  }

  async post<T, R>(
    path: string,
    data: T,
    params?: Record<string, string | number>,
    headers?: Record<string, string>
  ): Promise<R> {
    const url = this.createUrl(path, params);
    const config: AxiosRequestConfig = headers ? { headers } : {};

    try {
      const response: AxiosResponse<R> = await this.api.post(url, data, config);
      return response.data;
    } catch (error: unknown) {
      throw this.handleError(error);
    }
  }

  async put<T, R>(
    path: string,
    data: T,
    params?: Record<string, string | number>,
    headers?: Record<string, string>
  ): Promise<R> {
    const url = this.createUrl(path, params);
    const config: AxiosRequestConfig = headers ? { headers } : {};

    try {
      const response: AxiosResponse<R> = await this.api.put(url, data, config);
      return response.data;
    } catch (error: unknown) {
      throw this.handleError(error);
    }
  }

  // DELETE request
  async delete<T>(
    path: string,
    params?: Record<string, string | number>,
    headers?: Record<string, string>
  ): Promise<T> {
    const url = this.createUrl(path, params);
    const config: AxiosRequestConfig = headers ? { headers } : {};

    try {
      const response: AxiosResponse<T> = await this.api.delete(url, config);
      return response.data;
    } catch (error: unknown) {
      throw this.handleError(error);
    }
  }

  // Helper function to build URLs with query params
  private createUrl(
    path: string,
    params?: Record<string, string | number>
  ): string {
    let url = path;
    if (params && Object.keys(params).length > 0) {
      const queryParams = new URLSearchParams(params as Record<string, string>);
      url = `${url}?${queryParams.toString()}`;
    }
    return url;
  }

  private handleError(error: unknown): string {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return `Error: ${error.response.status} - ${error.response.data}`;
      } else if (error.request) {
        return "Error: No response from server.";
      } else {
        return `Error: ${error.message}`;
      }
    } else {
      return `Error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`;
    }
  }
}
