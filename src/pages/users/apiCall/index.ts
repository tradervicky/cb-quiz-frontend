import { authUrl } from "@/apis/auth";
import { toast } from "sonner";
import { makeApiRequest } from "../../../apis/functions";
import { Params } from "react-router-dom";

export const getInstructorQuiz = async () => {
  const response = await makeApiRequest({
    method: "GET",
    url: authUrl.USER_ALL_QUIZ,
  });
  return response;
};

//get session Id

export const getSessionId = async () => {
  const response = makeApiRequest({
    method: "POST",
    url: authUrl.GET_SESSION_ID,
  });
  return response;
};

export const createOrder = async (data: any) => {
  const response = await makeApiRequest({
    method: "POST",
    url: authUrl.CREATE_ORDER,
    data,
  });
  return response;
};
export const verifyPayment = async (data: any) => {
  const response = await makeApiRequest({
    method: "POST",
    url: authUrl.VERIFY_ORDER,
    data,
  });
  return response;
};

// get Quiz

export const getPrivateQuiz = async (data) => {
  const response = await makeApiRequest({
    method: "POST",
    url: authUrl.USER_ALL_PRIVATE_QUIZES,
    data: data,
  });
  return response;
};
export const getMyQuiz = async (data) => {
  const response = await makeApiRequest({
    method: "POST",
    url: authUrl.USER_MY_QUIZES,
    data: data,
  });
  return response;
};
export const getQuizById = async (id: Params) => {
  const response = await makeApiRequest({
    method: "POST",
    url: authUrl.USER_QUIZ_BY_ID + id,
  });
  return response;
};
export const startQuiz = async (id: Params) => {
  const response = await makeApiRequest({
    method: "POST",
    url: authUrl.START_QUIZ + id,
  });
  return response;
};
export const attemptQuestion = async (data: any) => {
  const response = await makeApiRequest({
    method: "POST",
    url: authUrl.SUBMIT_ANSWER,
    data: data,
  });
  return response;
};
export const finalSubmit = async (data: any) => {
  const response = await makeApiRequest({
    method: "POST",
    url: authUrl.FINAL_SUBMIT,
    data: data,
  });
  return response;
};
export const getLeaderboard = async (data: any) => {
  const response = await makeApiRequest({
    method: "POST",
    url: authUrl.LEADERBOARD,
    data: data,
  });
  return response;
};
export const getUserTestReport = async (data: any) => {
  const response = await makeApiRequest({
    method: "POST",
    url: authUrl.USER_REPORT,
    data: data,
  });
  return response;
};
