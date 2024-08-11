import { AxiosRequestHeaders } from 'axios';
export interface loginProps {
    image: string,
    desc : string,
}

export interface signupProps {
    image: string,
    desc : string,
}



export interface MakeApiRequestParams {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'; 
  url: string;
  data?: any;
  params?: any;
  additionalHeaders?:  Record<string, string>;
}

export interface RouteConfig {
  path: string;
  exact?: boolean;
  element: React.ReactNode; 
}
export interface childrenProps {
  children: React.ReactNode
}