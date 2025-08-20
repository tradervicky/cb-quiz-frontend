import React, { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { RouteConfig } from "interfaces/global";
import Layout from "@/layout";
import Checkout from "@/pages/users/buyTest";
import ChooseTest from "@/pages/users/quiz/chooseTest";
import InstructionsPanel from "@/pages/users/quiz/instruction";
import ExamInfoPage from "@/pages/users/quiz/instruction/examInfo";
import FinalTestPage from "@/pages/users/quiz/finalPage";
import UserCustomSignup from "@/pages/users/signup";
import AdminLogin from "@/pages/admin/loginpage";
import AdminSignup from "@/pages/admin/signup";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "@/store/reducers/reducer";
const AddCategory = lazy(() => import("@/pages/admin/addCategory"));
const AddTypes = lazy(() => import("@/pages/admin/addTypes"));
const AddQuestions = lazy(() => import("@/pages/admin/addQuestions"));
const AdminDashboard = lazy(() => import("@/pages/admin/dashboard"));
const UserLogin = lazy(() => import("@/pages/users/login"));
const UserContainer = lazy(() => import("@/container/users"));
const Pricing = lazy(() => import("@/pages/users/pricing"));
const MyTests = lazy(() => import("@/pages/users/mytest"));
const CreateQuiz = lazy(() => import("@/pages/admin/createQuiz"));
// const AddQuiz = lazy(() => import("@/pages/admin/createQuiz/AddQuiz"));

// Open Routes
const openRoutes: RouteConfig[] = [
  //user open routes
  { path: "/user/login", exact: true, element: <UserLogin /> },
  { path: "/user/signup", exact: true, element: <UserCustomSignup /> },
  { path: "/", exact: true, element: <UserContainer /> },
  { path: "/pricing", exact: true, element: <Pricing /> },
  { path: "/about", exact: true, element: <Checkout /> },
  { path: "*", exact: true, element: <UserContainer /> },
  //adminopen routes
  { path: "admin/signup", exact: true, element: <AdminSignup /> },
  { path: "/admin/login", exact: true, element: <AdminLogin /> },
  //super admin open routes
];
// users Routes
const usersRoutes: RouteConfig[] = [
  { path: "/user/test-dashboard", exact: true, element: <ChooseTest /> },
  {
    path: "/user/test-instruction",
    exact: true,
    element: <InstructionsPanel />,
  },
  { path: "/user/test-info", exact: true, element: <ExamInfoPage /> },
  { path: "/user/final-test", exact: true, element: <FinalTestPage /> },
  { path: "/user/tests", exact: true, element: <MyTests /> },
  { path: "/pricing", exact: true, element: <Pricing /> },
  { path: "/about", exact: true, element: <Checkout /> },
  { path: "/", exact: true, element: <UserContainer /> },
  { path: "*", exact: true, element: <UserContainer /> },
];

// const usersRoutes: RouteConfig[] =[
//   { path: "/test-dashboard", exact: true, element: < ChooseTest/> },
//   { path: "/test-instruction", exact: true, element: < InstructionsPanel/> },
//   { path: "/test-info", exact: true, element: < ExamInfoPage/> },
//   { path: "/final-test", exact: true, element: < FinalTestPage/> },
//   { path: "/my-tests", exact: true, element: <MyTests/> },
// ]

// const openRoutes: RouteConfig[] = [
//   { path: "/user/login", exact: true, element: <UserLogin /> },
//   { path: "/user/signup", exact: true, element: <UserCustomSignup/> },
//   { path: "/", exact: true, element: < UserContainer/> },
//   { path: "/pricing", exact: true, element: < Pricing/> },
//   { path: "/about", exact: true, element: < Checkout/> },
//   { path: "/test-dashboard", exact: true, element: < ChooseTest/> },
//   { path: "/test-instruction", exact: true, element: < InstructionsPanel/> },
//   { path: "/test-info", exact: true, element: < ExamInfoPage/> },
//   { path: "/final-test", exact: true, element: < FinalTestPage/> },
//   { path: "/my-tests", exact: true, element: <MyTests/> },
// ];

// Admin(Instructor) Routes
const adminRoutes: RouteConfig[] = [
  { path: "/dashboard", exact: true, element: <AdminDashboard /> },
  { path: "/quiz/category", exact: true, element: <AddCategory /> },
  { path: "/quiz/type", exact: true, element: <AddTypes /> },
  { path: "/quiz/questions", exact: true, element: <AddQuestions /> },
  { path: "/create-quiz", exact: true, element: <CreateQuiz /> },
  { path: "*", exact: true, element: <AdminDashboard /> },
];

// User Routes

// Super Admin Routes
const PageRoutes: React.FC = () => {
  const [allRoutes, setAllRoutes] = useState<RouteConfig[]>(openRoutes);
  // const userRole =  useSelector((state: RootState) => state?.auth.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state?.auth.isAuthenticated
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      const role = userData.role;

      if (role === "admin") {
        setAllRoutes(adminRoutes);
      } else if (role === "user") {
        setAllRoutes(usersRoutes);
        // } else if (role === "super-admin") {
        //   setAllRoutes([...openRoutes, ...superAdminRoutes]);
      }
    } else {
      setAllRoutes(openRoutes);
    }
  }, [isAuthenticated]);

  const generateRoutes = (routes: RouteConfig[]) => {
    return routes.map(({ path, element }, i) => (
      <Route key={i} path={path} element={element} />
    ));
  };

  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>{generateRoutes(allRoutes)}</Routes>
      </Suspense>
    </Layout>
  );
};

export default PageRoutes;
