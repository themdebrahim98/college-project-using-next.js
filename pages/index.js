import { Grid } from "@mui/material";
import BlogCard from "../src/components/dashboard/BlogCard";
import SalesOverview from "../src/components/dashboard/SalesOverview";
import DailyActivity from "../src/components/dashboard/DailyActivity";
import ProductPerfomance from "../src/components/dashboard/ProductPerfomance";
import TeacherDashboard from "../src/components/teacher/dashboard/TeacherDashboard";
import StudentDashboard from "../src/components/student/StudentDashboard";
import AdminDashboard from "../src/components/admin/dashboard/AdminDashboard";
export default function Index() {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        {/* <TeacherDashboard/>
        <StudentDashboard/> */}
        <AdminDashboard/>
        </Grid>
    </Grid>
  );
}
