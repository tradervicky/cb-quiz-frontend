import axios, { AxiosResponse, AxiosError } from 'axios';
import { MakeApiRequestParams } from 'interfaces/global';
const baseUrl = import.meta.env.VITE_REACT_API_URL
const api = axios.create({
  baseURL:baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const makeApiRequest = async <T = any>({method,url,data = null,params = null,additionalHeaders = {},
  }: MakeApiRequestParams): Promise<T>=> {
  try {
    const response: AxiosResponse<T> = await api.request({
      method,
      url,
      data,
      params,
      headers: {
        ...api.defaults.headers as Record<string, string>,
        ...additionalHeaders as Record<string, string>,
      },
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError.response ? axiosError.response.data : error;
  }
};
