export const useMenu = (data) => {
  const menuItem = [];
  if (data?.type == "admin") {
    menuItem.push({
      title: "Dashbaord",
      icon: "home",
      href: "/",
    });
    menuItem.push({
      title: "Teacher",
      icon: "home",
      href: "/teacher",
    })
  } else {
    menuItem.push({
      title: "Students",
      icon:'home',
      href: "/student",
    });
    if (data?.is_hod == 1) {
      menuItem.push({
        title: "Pending Students",
        icon:"home",
        href: "/student/pendingStudent",
      });
    }
  }

  return menuItem;
};


