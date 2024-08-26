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

interface Invoice {
  invoice: string;
  paymentStatus: string;
  paymentMethod: string;
  totalAmount: string;
  customStyle ?: string
}
interface header {
  title : string;
  style : string
}

export interface CustomTableProps {
  rowsData : object[];
  headerData : object[];
}
