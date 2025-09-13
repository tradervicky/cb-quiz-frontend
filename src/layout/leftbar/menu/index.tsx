import { RootState } from "@/store/store";
import {
  BookOpenCheck,
  BookOpenIcon,
  ChevronRight,
  ClipboardMinus,
  GraduationCap,
  LayoutDashboard,
  ShoppingBag,
  User,
} from "lucide-react";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
interface MenuSideBarProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

const MenuSidebar: React.FC<MenuSideBarProps> = ({
  isCollapsed,
  toggleCollapse,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const role = useSelector((state: RootState) => state?.auth.user?.role);

  // Menu data
  const menuItems = [
    {
      title: "Quiz",
      icon: <BookOpenIcon />,
      toLink: "/quiz",
      role: ["admin"],
      subMenu: [
        {
          title: "Category",
          toLink: "/quiz/category",
        },
        {
          title: "Type",
          toLink: "/quiz/type",
        },
        {
          title: "Questions",
          toLink: "/quiz/questions",
        },
        {
          title: "Quizzes",
          toLink: "/create-quiz",
        },
      ],
    },
    {
      title: "All Tests",
      role: ["user"],
      icon: <ShoppingBag />,
      toLink: "/user/all-tests",
    },
    {
      title: "My Tests",
      role: ["user"],
      icon: <BookOpenCheck />,
      toLink: "/user/my-tests",
    },
    {
      title: "Reports",
      role: ["user"],
      icon: <ClipboardMinus />,
      toLink: "/user/reports",
    },
    {
      title: "Students",
      role: ["admin"],
      icon: <GraduationCap />,
      toLink: "/admin/students",
    },
    {
      title: "Profile",
      role: ["admin", "user"],
      icon: <User />,
      toLink: "/profile",
    },
  ];
  const [menus, setMenus] = useState(menuItems);

  const menuDashboard = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard />,
      toLink: "/dashboard",
    },
  ];

  // Update activeItem when the location changes
  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);

  const handleNavigation = (toLink: string) => {
    navigate(toLink);
  };

  const toggleSubMenu = (title: string) => {
    setOpenSubMenu(openSubMenu === title ? null : title);
  };

  const isMenuItemActive = (
    menuItemToLink: string,
    subMenu?: { toLink: string }[]
  ) => {
    if (activeItem === menuItemToLink) {
      return true;
    }
    if (subMenu) {
      return subMenu.some((subItem) => activeItem.startsWith(subItem.toLink));
    }
    return false;
  };
  const renderMenuItems = () => {
    if (role === "admin") {
      let filteredItems = menuItems.filter((item) =>
        item.role.includes("admin")
      );
      setMenus(filteredItems);
    } else if (role === "user") {
      let filteredItems = menuItems.filter((item) =>
        item.role.includes("user")
      );
      setMenus(filteredItems);
    }
  };
  console.log(menuItems.filter((item) => item.role.includes("admin")));
  useEffect(() => {
    renderMenuItems();
  }, [role]);
  return (
    <div className={`${isCollapsed && "w-20 "}bg-primary`}>
      <ul>
        {!isCollapsed && (
          <p className="text-custom-h6 text-highlight p-2">Menu</p>
        )}
        {menuDashboard.map((data, index) => (
          <li key={index} onClick={isCollapsed ? toggleCollapse : undefined}>
            <button
              onClick={() => handleNavigation(data.toLink)}
              className={`flex ${
                isCollapsed && "w-[70px] mx-auto justify-center"
              }  p-4 items-center gap-4  w-full mt-2  text-left  font-medium bg-secondary rounded-lg ${
                isMenuItemActive(data.toLink) ? "bg-white text-highlight" : ""
              }`}
            >
              {data.icon}
              {!isCollapsed ? data.title : ""}
            </button>
          </li>
        ))}
        {!isCollapsed && <p className="text-highlight p-2 ">Components</p>}
        {menus.map((data, index) => (
          <li key={index} onClick={isCollapsed ? toggleCollapse : undefined}>
            <button
              onClick={() => {
                if (data.subMenu) {
                  toggleSubMenu(data.title);
                } else {
                  handleNavigation(data.toLink);
                }
              }}
              className={`flex ${
                isCollapsed && "w-[70px] mx-auto justify-center"
              }  p-4 items-center gap-4  w-full mt-2  text-left  font-medium bg-secondary rounded-lg ${
                isMenuItemActive(data.toLink, data.subMenu)
                  ? "bg-white text-highlight"
                  : ""
              }`}
            >
              {data.icon}
              {!isCollapsed ? data.title : ""}
            </button>
            {data.subMenu && (
              <div className="border-l-2 border-white mt-2">
                <ul
                  className={`overflow-hidden transition-[max-height] ml-8 duration-500 ease-in-out ${
                    openSubMenu === data.title && !isCollapsed
                      ? "max-h-[500px]"
                      : "max-h-0"
                  }`}
                >
                  {data.subMenu.map((subItem, subIndex) => (
                    <li key={subIndex} className="">
                      <button
                        onClick={() => handleNavigation(subItem.toLink)}
                        className={`flex  rounded-lg py-2 px-2 items-center gap-2 w-full text-left text-custom-h6 font-medium ${
                          activeItem === subItem.toLink
                            ? "bg-white text-highlight"
                            : ""
                        }`}
                      >
                        <ChevronRight />
                        {subItem.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuSidebar;
