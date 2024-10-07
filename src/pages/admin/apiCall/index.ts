import { authUrl } from "@/apis/auth"
import { makeApiRequest } from "@/apis/functions"

export const addCategory = async(data:Object)=>{
    const response = makeApiRequest({method:"POST",url:authUrl.CREATE_CATEGORY, data:data})

      return response;
}