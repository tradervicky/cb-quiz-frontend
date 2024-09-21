import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiError, apiRequestConfig, ApiResponse } from './interface';

const baseUrl = import.meta.env.VITE_REACT_API_URL;

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

const token = localStorage.getItem("token");

export const makeApiRequest = async <T>({
  method,
  url,
  data,
  additionalHeaders = {},
}: apiRequestConfig): Promise<T> => {
  // Ensure additionalHeaders is an object
  if (typeof additionalHeaders !== 'object' || additionalHeaders === null) {
    throw new Error('additionalHeaders should be an object');
  }

  // Construct the headers object
  const headers = {
    Authorization: token ? `Bearer ${token}` : '',
    ...additionalHeaders,
  };

  try {
    // Make the API request
    const config: AxiosRequestConfig = {
      method,
      url,
      data,
      headers,
    };

    const response: AxiosResponse<T> = await api.request<T>(config);
    
    // Return the response data
    return response.data;
  } catch (error: any) {
    const apiError = error as ApiError;
    // Throw error response data if available, otherwise throw the error object
    throw apiError.response ? apiError.response.data : apiError;
  }
};
