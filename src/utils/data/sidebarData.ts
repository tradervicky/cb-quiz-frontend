export const menuItems = [
  {
    title: "Dashboard",
    icon: "LayoutDashboard",
    toLink: "/dashboard",
  },
  {
    title: "Quiz",
    icon: "",
    toLink: "/quiz",
    subMenu: [
      {
        title: "Category",
        icon: "",
        toLink: "/category",
      },
      {
        title: "Question Type",
        icon: "",
        toLink: "/type",
      },
      {
        title: "Questions",
        icon: "",
        toLink: "/questions",
      },
    ],
  },
  {
    title: "Profile",
    icon: "",
    toLink: "/profile",
  },
];
