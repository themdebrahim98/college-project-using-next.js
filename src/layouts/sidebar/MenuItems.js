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
      icon: "user",
      href: "/teacher",
    });
    menuItem.push({
      title: "Subjects",
      icon:"clipboard",
      href: "/subject",
    });
  } else if(data?.type == "teacher"){
    menuItem.push({
      title: "Dashbaord",
      icon: "home",
      href: "/",
    });
    menuItem.push({
      title: "Students",
      icon:'users',
      href: "/student",
    });
    if (data?.is_hod == 1) {
      menuItem.push({
        title: "Pending Students",
        icon:"clock",
        href: "/student/pendingStudent",
      });
      menuItem.push({
        title: "Notices",
        icon:"clipboard",
        href: "/notices",
      });
      menuItem.push({
        title: "Subjects",
        icon:"clipboard",
        href: "/teacher/subject",
      });
    }
  }else if(data?.type == "student"){
    menuItem.push({
      title: "Dashbaord",
      icon: "home",
      href: "/",
    });
    menuItem.push({
        title: "Notices",
        icon:"clipboard",
        href: "/notices",
    });
    menuItem.push({
        title: "Subjects",
        icon:"clipboard",
        href: "/student/subject",
      });
  }

  return menuItem;
};


