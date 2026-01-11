import { authUrl } from "../auth";
import { makeApiRequest } from "../functions";

export const getAdminProfile = async () => {
  return await makeApiRequest<any>({
    method: "GET",
    url: authUrl.ADMIN_PROFILE,
  });
};

export const updateAdminProfile = async (data: any) => {
  return await makeApiRequest<any>({
    method: "PUT",
    url: authUrl.ADMIN_UPDATE_PROFILE,
    data,
  });
};

export const getAdminDashboardStats = async () => {
  return await makeApiRequest<any>({
    method: "GET",
    url: authUrl.ADMIN_DASHBOARD,
  });
};

export const getAdminStudents = async (params?: { page?: number; limit?: number; search?: string }) => {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.search) queryParams.append('search', params.search);
  
  const url = queryParams.toString() 
    ? `${authUrl.ADMIN_STUDENTS}?${queryParams.toString()}` 
    : authUrl.ADMIN_STUDENTS;
    
  return await makeApiRequest<any>({
    method: "GET",
    url,
  });
};
