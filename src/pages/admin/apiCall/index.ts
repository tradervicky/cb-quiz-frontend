import { authUrl } from "@/apis/auth";
import { makeApiRequest } from "@/apis/functions";

//add category
export const addCategory = async (data: Object) => {
  const response = makeApiRequest({ method: "POST",url: authUrl.CREATE_CATEGORY,data: data,});
  return response;
};

//get category
export const getAdminCategory = async () => {
  const response = makeApiRequest({ method: "GET",url: authUrl.GET_CATEGORY});
  return response;
};
//add types
export const addTypes = async (data: Object) => {
  const response = makeApiRequest({ method: "POST",url: authUrl.CREATE_TYPE,data: data,});
  return response;
};
//add question
export const addQuestion = async (data: Object) => {
  const response = makeApiRequest({ method: "POST",url: authUrl.ADD_QUESTION,data: data,});
  return response;
};

//get all questions

export const getAllQuestions = async () => {
  const response = makeApiRequest({ method: "GET",url: authUrl.GET_ALL_QUESTION});
  return response;
};

//add quizes
export const addQuiz = async (data: Object) => {
  const response = makeApiRequest({ method: "POST",url: authUrl.CREATE_QUIZ,data: data,});
  return response;
};
//get all quizes
export const getAllQuiz = async () => {
  const response = makeApiRequest({ method: "GET",url: authUrl.GET_ALL_QUIZ});
  return response;
};

//get quiz by id
export const getQuizById = async (id:string) => {
  const response = makeApiRequest({ method: "GET",url: `${authUrl.GET_QUIZ_BY_ID}${id}`});
  return response;
};
//update quizes
export const updateQuiz = async (data: Object, id:string) => {
  const response = makeApiRequest({ method: "PUT",url: `${authUrl.UPDATE_QUIZ}${id}`,data: data,});
  return response;
};
//delete quizes
export const deleteQuiz = async (id:string) => {
  const response = makeApiRequest({ method: "PUT",url: `${authUrl.DELETE_QUIZ}${id}`});
  return response;
};
//retrive quizes
export const retriveQuiz = async (id:string) => {
  const response = makeApiRequest({ method: "PUT",url: `${authUrl.RETRIVE_QUIZ}${id}`});
  return response;
};