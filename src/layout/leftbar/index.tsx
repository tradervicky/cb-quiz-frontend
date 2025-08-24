import { useState } from "react";
import MenuSideBar from "./menu";
import logo from "../../assets/logo.png";
import { ChevronLeftIcon } from "lucide-react";

const Leftbar = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`  bg-primary text-text mt-0 h-screen px-4  flex flex-col  items-center pb-4 z-10 relative transition-all duration-300 ${
        !isCollapsed ? "w-[220px]" : "w-20"
      }`}
    >
      <div className="absolute right-0 top-2 bg-white px-4 py-2 rounded-l-lg cursor-pointer">
        <ChevronLeftIcon
          onClick={toggleCollapse}
          className={`${isCollapsed ? "rotate-180" : ""}`}
        />
      </div>
      {!isCollapsed && (
        <div className="flex justify-center flex-col items-center gap-2  pb-2 border-b-4 w-full border-highlight">
          <img
            src={logo}
            alt="Logo"
            className="w-[100px] h-[100px] object-cover rounded-full cursor-pointer mt-8"
          />
        </div>
      )}
      <div className={`${isCollapsed && "mt-12"}`}>
        <MenuSideBar
          isCollapsed={isCollapsed}
          toggleCollapse={toggleCollapse}
        />
      </div>
    </div>
  );
};

export default Leftbar;
