

import { authUrl } from "@/apis/auth";
import { makeApiRequest } from "@/apis/functions";
import {userSignup, userLogin} from '../../../../interfaces/users'
import { toast } from "sonner";
//userLogin 


interface LoginResponse {
  status: number;
  token: string;
  data: {
    id: number;
    email: string;
    name: string;
    // Add more fields if necessary
  };
}
export const handleLogin = async ({ email, password}:userLogin) => {
    try {
      const response = await makeApiRequest<LoginResponse>({
        method: "POST",
        url: authUrl.USER_LOGIN,
        data: { email, password },
      });
      console.log("Login successful:", response);
     
      if(response.status === 200){
        localStorage.setItem("token" , response.token)
        localStorage.setItem("data" , JSON.stringify(response.data))
        toast("Login Successfully")
      }
      
    } catch (error) {
      console.error("Login failed:", error);
    
    }
  };

export const handleSignup = async ({firstName, lastName, email, password }:userSignup) => {
    try {
      const response = await makeApiRequest({
        method: "POST",
        url: authUrl.USER_SIGNUP,
        data: {firstName, lastName, email, password },
      });
      console.log("Login successful:", response);
      
    } catch (error) {
      console.error("Login failed:", error);
    
    }
  };