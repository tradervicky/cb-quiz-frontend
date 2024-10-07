import { childrenProps } from "interfaces/global";
import Leftbar from "./leftbar";
import Topbar from "./topbar";
import Rightbar from "./rightbar";

const Layout: React.FC<childrenProps> = ({children }) => {
  const isAuthenticated = true
  return <div>
    {
      isAuthenticated ? 
      <div className="flex gap-1">
        <Leftbar/>
        <div className="flex  flex-col flex-grow">
            <Topbar />
            <Rightbar>{children}</Rightbar>
          </div>
      </div>
      :
      (children)
    }
   
    
    </div>;
};

export default Layout;
