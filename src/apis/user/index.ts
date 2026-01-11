import { authUrl } from "../auth";
import { makeApiRequest } from "../functions";

export const getUserProfile = async () => {
  return await makeApiRequest<any>({
    method: "GET",
    url: authUrl.USER_PROFILE,
  });
};

export const updateUserProfile = async (data: any) => {
  return await makeApiRequest<any>({
    method: "PUT",
    url: authUrl.USER_UPDATE_PROFILE,
    data,
  });
};
