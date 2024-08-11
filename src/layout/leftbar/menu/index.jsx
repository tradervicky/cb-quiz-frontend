import { BookOpenCheck, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MenuSidebar = () => {
  const navigate = useNavigate();
  // const [activeItem, setActiveItem] = useState("/dashboard");
  const location = useLocation();

  const [activeItem, setActiveItem] = useState(location.pathname);

  const menuSidebar = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard />,
      toLink: "/dashboard",
    },
    {
      title: "Quiz",
      icon: <BookOpenCheck />,
      toLink: "/dashboard",
    },
  ];
  return <div>MenuSidebar</div>;
};

export default MenuSidebar;
