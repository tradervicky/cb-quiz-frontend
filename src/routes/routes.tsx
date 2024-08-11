import React, { lazy, Suspense, useEffect, useState } from "react";
import {  Route, Routes } from 'react-router-dom';
import { RouteConfig } from "interfaces/global";
const UserLogin = lazy(()=> import("@/pages/users/login"))


    //open Routes
    const openRoutes : RouteConfig[]= [
      {path : "/", exact : true, element : <UserLogin/>}
  ]
  //admin Routes

  //user Routes

  //super admin Routes

const PageRoutes: React.FC= () => {

  const [allRoutes, setAllRoutes] = useState<RouteConfig[]>([])

  const generateRoutes = (routes:RouteConfig[])=>{

    return routes.map(({path, element}, i)=>(
      <Route key={i} path={path} element={element}/> 
    ))
  }
  return (
    
    <div>
       <Routes>
       <Suspense fallback>
        {generateRoutes(allRoutes)}
        </Suspense>
      </Routes>
    </div>
  )
}

export default PageRoutes