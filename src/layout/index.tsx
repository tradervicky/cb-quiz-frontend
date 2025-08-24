import { childrenProps } from "interfaces/global";
import Leftbar from "./leftbar";
import Topbar from "./topbar";
import Rightbar from "./rightbar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";

const Layout: React.FC<childrenProps> = ({ children }) => {
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

  return (
    <div>
      {isAuthenticated && (role === "admin" || role === "user") ? (
        <div className="flex gap-1">
          <Leftbar />
          <div className="flex  flex-col flex-grow">
            <Topbar />
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
