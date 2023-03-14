import React, { useEffect,useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Button,
} from "@mui/material";
import NextLink from "next/link";
import BaseCard from "../../src/components/baseCard/BaseCard";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from "../../commonVariable";

function approvedStudent() {
  const [teacherDatas, setteacherDatas] = useState([]);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [teacherId, setteacherId] = useState("");
  const [allDepertments, setallDepertments] = useState([]);
  const [allCourses, setallCourses] = useState([]);
  const [department_id, setdepartment_id] = useState("");
  const [course_id, setcourse_id] = useState("");
  const [selectedTeacherData, setselectedTeacherData] = useState([]);
  const products = [
    {
      id: "1",
      name: "Sunil Joshi",
      post: "Web Designer",
      pname: "Elite Admin",
      priority: "Low",
      pbg: "primary.main",
      budget: "3.9",
    },
    {
      id: "2",
      name: "Andrew McDownland",
      post: "Project Manager",
      pname: "Real Homes WP Theme",
      priority: "Medium",
      pbg: "secondary.main",
      budget: "24.5",
    },
    {
      id: "3",
      name: "Christopher Jamil",
      post: "Project Manager",
      pname: "MedicalPro WP Theme",
      priority: "High",
      pbg: "error.main",
      budget: "12.8",
    },
    {
      id: "4",
      name: "Nirav Joshi",
      post: "Frontend Engineer",
      pname: "Hosting Press HTML",
      priority: "Critical",
      pbg: "success.main",
      budget: "2.4",
    },
  ];
  useEffect(() => {
    console.log(Cookies.get("access_key"));
    const token = JSON.parse(localStorage.getItem("access_key"));

    const fetchTeacher = async () => {
      const res = await axios.post(`${BASE_URL}get_all_teacher`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(res.data.data.teachers, "teacher");
      const allTeachers = res.data.data.teachers.map((elm, idx) => {
        return elm;
      });
      // console.log(allTeachers, "allkjdscnkvn");
      setteacherDatas(allTeachers);
    };

    const fetchAllDepertment = async () => {
      const res2 = await axios.post(`${BASE_URL}get_departments`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res2.data.data.departments);
      setallDepertments([...res2.data.data.departments]);
    };

    const fetchALlCourse = async () => {
      const res2 = await axios.post(`${BASE_URL}get_courses`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res2.data.data.courses);
      setallCourses([...res2.data.data.courses]);
    };

    fetchTeacher();
    fetchAllDepertment();
    fetchALlCourse();
  }, []);

  return (
    <Box>
      <BaseCard title="Teacher List" button="true" sx={{ overflow: "scroll" }}>
        <Table
          aria-label="simple table"
          sx={{
            mt: 3,
            whiteSpace: "nowrap",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Id
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Teacher Id
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  First Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  last_name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  gender
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Email Address
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Phone Number
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {` Hod(yes/no)`}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Make Hod
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Preview{" "}
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.name}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    {1}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "600",
                        }}
                      >
                        {1111}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        sx={{
                          fontSize: "13px",
                        }}
                      >
                        {product.post}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {product.pname}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    sx={{
                      pl: "4px",
                      pr: "4px",
                      backgroundColor: product.pbg,
                      color: "#fff",
                    }}
                    size="small"
                    label={product.priority}
                  ></Chip>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">${product.budget}k</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </BaseCard>
    </Box>
  );
}

export default approvedStudent;
