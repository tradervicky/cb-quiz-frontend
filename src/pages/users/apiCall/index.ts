

import { authUrl } from "@/apis/auth";
import { toast } from "sonner";
import { makeApiRequest } from "../../../apis/functions"

export const getInstructorQuiz = async ()=>{
    const response = await makeApiRequest({method:'GET', url:authUrl.USER_ALL_QUIZ})
    return response
}