import { ADDRCONFIG } from "dns";

export const authUrl = {
  //super admin
  SUPER_LOGIN: "/super/signin",
  APPROVED_ADMIN: "/super/approve-admin/",
  GET_APPROVED_ADMIN: "approval-admins",
  
  //admin
  ADMIN_LOGIN: "admin/login",
  ADMIN_SIGNUP: "/admin/signup",
  INSTRUCTOR_QUIZ: "/admin/get-all-quiz",
  //admin category CRUD
  CREATE_CATEGORY: "admin/create-category",
  UPDATE_CATEGORY: "admin/update-category/",
  GET_CATEGORY: "/admin/get-category",
  CREATE_TYPE: "/admin/create-type",
  GET_TYPE: "/admin/get-type",
  GET_ADMIN_TYPES: "/admin/get-que-type",
  //admin questions
  ADD_QUESTION: "/admin/add-question",
  GET_ALL_QUESTION: "/admin/get-questions",
  GET_QUESTION_BY_ID: "/admin/get-question/",

  //admin quizes
  CREATE_QUIZ: "/admin/quiz-create",
  UPDATE_QUIZ: "/admin/quiz-update/",
  GET_ALL_QUIZ: "/admin/get-all-quiz",
  GET_QUIZ_BY_ID: "/admin/get-quiz/",
  DELETE_QUIZ: "/admin/delete-quiz",
  RETRIVE_QUIZ: "/admin/retrive-quiz",
  //user
  USER_SIGNUP: "user/signup",
  USER_LOGIN: "user/login",
  USER_ALL_QUIZ: "/user/get-all-quizes",

  //payment
  GET_SESSION_ID:"user/payment",
};
