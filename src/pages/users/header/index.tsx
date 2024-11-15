import React, { useEffect, useState } from "react";
import logo from "../../../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { checkAuth, logout } from "@/store/reducers/reducer";
const Header = () => {
  const [showSide, setShowSide] = useState(false);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const userData = useSelector((state: RootState)=>state?.auth.user)
  console.log("UserData", userData)
  console.log(isAuthenticated)
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>(); 
  useEffect(()=>{
    dispatch(checkAuth())
  },[])
  const handleLoginLogout = () => {
    isAuthenticated ? dispatch(logout()) :  navigate("/user/login");
  };

  return (
    <div className="flex justify-between px-4 sm:px-16 bg-primary h-20 items-center relative">
      <div className="flex items-center gap-4 text-sm font-semibold text-btn">
        <img
          src={logo}
          alt=""
          width={50}
          height={50}
          className="rounded-full"
        />{" "}
        QuizApp
      </div>
      <div
        className={`sm:flex absolute sm:static top-0 ${
          showSide
            ? "right-1  p-4 duration-1000 bg-highlight rounded-bl-lg"
            : "hidden"
        }`}
      >
        <button
          onClick={() => setShowSide(!showSide)}
          className={`px-4 py-2 border border-btn text-btn text-sm font-medium rounded-lg mb-4 sm:hidden`}
        >
          close
        </button>
        <ul className="flex flex-col sm:flex-row gap-4 sm:gap-16  text-btn font-medium ">
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/pricing"}>Pricing</NavLink>
          <NavLink to={"/about"}>About Us</NavLink>
          {userData?.role === "user" && <NavLink to={"/user/tests"}>My Purchase</NavLink>}
          
        </ul>
      </div>
      <div className="hidden sm:flex">
        <Button
          onClick={handleLoginLogout}
          className="px-4 py-2 bg-btn text-white text-sm font-medium rounded-lg"
        >
          {isAuthenticated ? "Logout" : "Login"}
        </Button>
      </div>
      <div className="flex sm:hidden">
        <img
          src="/images/hamburger.png"
          alt=""
          onClick={() => setShowSide(!showSide)}
        />
      </div>
    </div>
  );
};

export default Header;
