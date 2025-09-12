import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiError, apiRequestConfig } from "./interface";

const baseUrl = import.meta.env.VITE_REACT_API_URL;

const api = axios.create({
  baseURL: baseUrl,
});

export const makeApiRequest = async <T>({
  method,
  url,
  data,
  additionalHeaders = {},
}: apiRequestConfig): Promise<T> => {
  // Retrieve token from localStorage
  const token = localStorage.getItem("token");

  // Log the token for debugging purposes
  // console.log('Token:', token);

  // Ensure additionalHeaders is an object
  if (typeof additionalHeaders !== "object" || additionalHeaders === null) {
    throw new Error("additionalHeaders should be an object");
  }
  const isFormData = data instanceof FormData;

  // Construct the headers object
  const headers = {
    Token: token ? `${token}` : "",
    ...(isFormData ? {} : { "Content-Type": "application/json" }), // Add token if available
    ...additionalHeaders, // Include any additional headers
  };

  // Make sure headers are correctly set

  try {
    // Request configuration
    const config: AxiosRequestConfig = {
      method,
      url,
      data,
      headers,
    };

    // Make the API request and await response
    const response: AxiosResponse<T> = await api.request<T>(config);

    // Return the response data
    return response.data;
  } catch (error: any) {
    // Handle the error by checking if response data exists
    const apiError = error as ApiError;
    throw apiError.response ? apiError.response.data : apiError;
  }
};
