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


// const api = axios.create({
//   baseURL:baseUrl,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// const token = localStorage.getItem("token")

// export const makeApiRequest = async (method, url, data = null,  additionalHeaders = {}) => {
//   console.log(token)


//   if (typeof additionalHeaders !== 'object' || additionalHeaders === null) {
//     throw new Error('additionalHeaders should be an object');
//   }

//   const headers = {
//     ...api.defaults.headers,
//     ...token ? { token: token } : {}, 
//     ...additionalHeaders,
//   };
//   try {
//     console.log(additionalHeaders)
//     const response = await api.request({
//       method,
//       url,
//       data,
//       headers
//     });
//     return response.data;
//   } catch (error) {
//     throw error.response ? error.response.data : error
//   }
// };