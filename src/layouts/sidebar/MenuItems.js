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
      icon: "clipboard",
      href: "/subject",
    });

    menuItem.push({
      title: "Session",
      icon: "clipboard",
      href: "/session",
    });

    menuItem.push({
      title: "Master",
      icon: "settings",
      href: "/master",
    });


  } else if (data?.type == "teacher") {
    menuItem.push({
      title: "Dashbaord",
      icon: "home",
      href: "/",
    });
    menuItem.push({
      title: "Class Room",
      icon: "clipboard",
      href: "/teacher/classRoom",
    });
    menuItem.push({
      title: "Students",
      icon: 'users',
      href: "/student",
    });
    menuItem.push({
      title: "Syllabus",
      icon: "clipboard",
      href: "/teacher/syllabus",
    });

    menuItem.push({
      title: "Routine",
      icon: "clipboard",
      href: "/teacher/routine",
    });
    menuItem.push({
      title: "Exam",
      icon: "clipboard",
      href: "/teacher/exam",
    });
    if (data?.is_hod == 1) {
      menuItem.push({
        title: "Pending Students",
        icon: "clock",
        href: "/student/pendingStudent",
      });
      menuItem.push({
        title: "Notices",
        icon: "clipboard",
        href: "/notices",
      });

    }
  } else if (data?.type == "student") {
    menuItem.push({
      title: "Dashbaord",
      icon: "home",
      href: "/",
    });
    menuItem.push({
      title: "Classes",
      icon: "clipboard",
      href: "/user/student/studentClass",
    });
    menuItem.push({
      title: "Notices",
      icon: "clipboard",
      href: "/notices",
    });
    menuItem.push({
      title: "career",
      icon: "user-check",
      href: "/student/career",
    });
    // menuItem.push({
    //   title: "Syllabus",
    //   icon: "clipboard",
    //   href: "/user/student/syllabus",
    // });
    // menuItem.push({
    //   title: "Routine",
    //   icon: "clipboard",
    //   href: "/user/student/routine",
    // });
  }

  return menuItem;
};


