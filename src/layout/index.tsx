import { childrenProps } from "interfaces/global";

const Layout: React.FC<childrenProps> = ({children }) => {

  return <div>{children}</div>;
};

export default Layout;
