import { childrenProps } from "interfaces/global";
import Leftbar from "./leftbar";
import Topbar from "./topbar";
import Rightbar from "./rightbar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { hiddenBarRoutes } from "@/shared/constants";
import { useLocation } from "react-router-dom";

const Layout: React.FC<childrenProps> = ({ children }) => {
  const location = useLocation(); // react-router
  const shouldHideBars = hiddenBarRoutes.some((route) =>
    location.pathname.startsWith(route)
  );
  const isAuthenticated = useSelector(
    (state: RootState) => state?.auth.isAuthenticated
  );
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setRole(parsedUser?.role || null);
    } else {
      setRole(null);
    }
  }, [isAuthenticated]);
  console.log(shouldHideBars);
  return (
    <div>
      {isAuthenticated && (role === "admin" || role === "user") ? (
        <div className="flex gap-1">
          {!shouldHideBars && <Leftbar />}
          <div className="flex  flex-col flex-grow">
            {!shouldHideBars && <Topbar />}
            <Rightbar>{children}</Rightbar>
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default Layout;
