import React, { lazy, Suspense, useState } from "react";
import { Route, Routes } from 'react-router-dom';
import { RouteConfig } from "interfaces/global";
import Layout from "@/layout";
import Checkout from "@/pages/users/buyTest";
import ChooseTest from "@/pages/users/quiz/chooseTest";
import InstructionsPanel from "@/pages/users/quiz/instruction";
import ExamInfoPage from "@/pages/users/quiz/instruction/examInfo";
import FinalTestPage from "@/pages/users/quiz/finalPage";
import AdminCustomSignup from "@/pages/users/signup";
const AddCategory = lazy(() => import ("@/pages/admin/addCategory"));
const AddTypes = lazy(() => import ("@/pages/admin/addTypes"));
const AddQuestions = lazy(() => import ("@/pages/admin/addQuestions"));
const AdminDashboard = lazy(() => import ("@/pages/admin/dashboard"));
const UserLogin = lazy(() => import("@/pages/users/login"));
const UserContainer = lazy(() => import("@/container/users"));
const Pricing = lazy(() => import("@/pages/users/pricing"));
// Open Routes

const openRoutes: RouteConfig[] = [
  { path: "/", exact: true, element: <UserLogin /> },
  { path: "/home", exact: true, element: < UserContainer/> },
  { path: "/pricing", exact: true, element: < Pricing/> },
  { path: "/about", exact: true, element: < Checkout/> },
  { path: "/test-dashboard", exact: true, element: < ChooseTest/> },
  { path: "/test-instruction", exact: true, element: < InstructionsPanel/> },
  { path: "/test-info", exact: true, element: < ExamInfoPage/> },
  { path: "/final-test", exact: true, element: < FinalTestPage/> },
  { path: "/admin-signup", exact: true, element: <AdminCustomSignup/> },
];

// Admin Routes
const adminRoutes: RouteConfig[] = [
  { path: "/dashboard", exact: true, element: < AdminDashboard/> },
  { path: "/quiz/category", exact: true, element: < AddCategory/> },
  { path: "/quiz/type", exact: true, element: < AddTypes/> },
  { path: "/quiz/questions", exact: true, element: < AddQuestions/> },
]

// User Routes

// Super Admin Routes

const PageRoutes: React.FC = () => {
  const [allRoutes, setAllRoutes] = useState<RouteConfig[]>(openRoutes);

  const generateRoutes = (routes: RouteConfig[]) => {
    return routes.map(({ path, element }, i) => (
      <Route key={i} path={path} element={element} />
    ));
  };

  return (
    <Layout>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {generateRoutes(allRoutes)}
      </Routes>
    </Suspense>
    </Layout>
  );
};

export default PageRoutes;
