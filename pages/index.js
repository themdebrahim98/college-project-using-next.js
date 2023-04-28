import { Grid } from "@mui/material";
import TeacherDashboard from "../src/components/teacher/dashboard/TeacherDashboard";
import StudentDashboard from "../src/components/student/StudentDashboard";
import AdminDashboard from "../src/components/admin/dashboard/AdminDashboard";
import { useSelector } from 'react-redux';
import { commonConstants } from "../src/constant/common.constant";

function userDashboard() {
  const data = useSelector((store) => store.user);
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        {data.userData?.user_data?.type==commonConstants.userTypeTeacher?<TeacherDashboard/>
        :data.userData?.user_data?.type==commonConstants.userTypeAdmin?
        <AdminDashboard/>:<StudentDashboard userData={data.userData?.user_data}/>
        }
        
        </Grid>
    </Grid>
  );
}

export default userDashboard;
