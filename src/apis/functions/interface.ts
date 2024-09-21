//api request

import { AxiosError, AxiosResponse, Method } from "axios";

export interface apiRequestConfig <T=any>{
    method :Method,
    url :string,
    data? : T,
    additionalHeaders? : Record<string, string>
}

export interface ApiResponse<T> {
    data: T;                 
    status: number;          
    statusText: string;     
    additionalHeaders: Record<string, string>;   
  }
 

  export interface ApiError extends AxiosError {
    response?: AxiosResponse<any>;  
  }