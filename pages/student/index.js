import React, { useEffect, useState } from "react";
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
  TableContainer,
  Paper,
} from "@mui/material";
import NextLink from "next/link";
import BaseCard from "../../src/components/baseCard/BaseCard";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from "../../commonVariable";

function pendingStudent() {
  const [allApprovedStudents, setallApprovedStudents] = useState([]);
  useEffect(() => {
    const token = Cookies.get("access_key");

    const fetchAllApprovedStudents = async () => {
      try {
        const res = await axios.post(`${BASE_URL}get_all_students`, null, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res.data);
        setallApprovedStudents(res.data.data.students);
      } catch (error) {
        alert(err);
      }
    };

    fetchAllApprovedStudents();
  }, []);
  const handlePreview = (student_id) => {
    console.log(student_id);
  };
  const handleApprove = async (
    student_id,
    first_name,
    last_name,
    email_address
  ) => {
    const token = Cookies.get("access_key");
    try {
      const res = await axios.post(
        `${BASE_URL}approve_student`,
        {
          student_id,
          first_name,
          last_name,
          email_address,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(res.data);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <TableContainer
      component={Paper}
      style={{ minHeight: "100vh", overflowX: "auto" }}
    >
      <Table
        aria-label="simple table"
        sx={{
          p: 2,
          whiteSpace: "nowrap",
        }}
        size="small"
      >
        <TableHead sx={{fontWeight:"bold"}}>
          <TableRow>
            <TableCell>
              <Typography variant="h6" sx={{ fontSize: "15px", color: "black" }}>Sl.no</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" sx={{ fontSize: "15px", color: "black" }}>Reg. no.</Typography>
            </TableCell>
            <TableCell>
              <Typography
                sx={{ fontSize: "15px", color: "black" }}
                variant="h6"
              >
                Full Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                sx={{ fontSize: "15px", color: "black" }}
                variant="h6"
              >
                DOB
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                sx={{ fontSize: "15px", color: "black" }}
                variant="h6"
              >
                Gender
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                sx={{ fontSize: "15px", color: "black" }}
                variant="h6"
              >
                Email
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                sx={{ fontSize: "15px", color: "black" }}
                variant="h6"
              >
                Phone No.
              </Typography>
            </TableCell>

            <TableCell>
              <Typography
                sx={{ fontSize: "15px", color: "black" }}
                variant="h6"
              >
                Roll No.
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                sx={{ fontSize: "15px", color: "black" }}
                variant="h6"
              >
                Course
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                sx={{ fontSize: "15px", color: "black" }}
                variant="h6"
              >
                Department
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                sx={{ fontSize: "15px", color: "black" }}
                variant="h6"
              >
                Year
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                sx={{ fontSize: "15px", color: "black" }}
                variant="h6"
              >
                Semester
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>{" "}
        <TableBody>
          {allApprovedStudents.map((student, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {idx+1}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {student.student_id}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {student.first_name+" "+student.last_name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {student.dob}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {student.gender}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {student.email_address}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {student.phone_number}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {student.roll_number}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {student.course_name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {student.department_name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {student.year}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {student.semester}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default pendingStudent;
