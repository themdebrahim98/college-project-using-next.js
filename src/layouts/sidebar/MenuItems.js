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
    
    menuItem.push({
      title: "Session",
      icon:"clipboard",
      href: "/session",
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
     menuItem.push({
        title: "Syllabus",
        icon:"clipboard",
        href: "/teacher/syllabus",
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
      // menuItem.push({
      //   title: "Subject",
      //   icon:"clipboard",
      //   href: "/teacher/allSubject",
      // });
     
  
      menuItem.push({
        title: "Routine",
        icon:"clipboard",
        href: "/teacher/routine",
      });
      // menuItem.push({
      //   title: "Student Session Assign",
      //   icon:"clipboard",
      //   href: "/session/studentsessionassign",
      // });
    
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
    // menuItem.push({
    //     title: "Subjects",
    //     icon:"clipboard",
    //     href: "/student/subject",
    //   });
  }

  return menuItem;
};


