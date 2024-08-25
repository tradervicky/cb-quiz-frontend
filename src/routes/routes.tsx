import React, { lazy, Suspense, useState } from "react";
import { Route, Routes } from 'react-router-dom';
import { RouteConfig } from "interfaces/global";
import Layout from "@/layout";
const AddCategory = lazy(() => import ("@/pages/admin/addCategory"));
const AddTypes = lazy(() => import ("@/pages/admin/addTypes"));
const AddQuestions = lazy(() => import ("@/pages/admin/addQuestions"));
const AdminDashboard = lazy(() => import ("@/pages/admin/dashboard"));
const UserLogin = lazy(() => import("@/pages/users/login"));

// Open Routes
const openRoutes: RouteConfig[] = [
  { path: "/", exact: true, element: <UserLogin /> }
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
  const [allRoutes, setAllRoutes] = useState<RouteConfig[]>(adminRoutes);

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
