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

function approvedStudent() {
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
  const handlePreview = (student_id)=>{
    console.log(student_id)
  }
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
      
      console.log(res.data)
    } catch (error) {
      alert(error);
    }
  };
  return (
    <TableContainer
      component={Paper}
      style={{ minHeight: '100vh', overflowX: "auto" }}
    >
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
              <Typography variant="h6">Id</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Student Id</Typography>
            </TableCell>
            <TableCell>
              <Typography
                sx={{ fontSize: "15px", color: "black" }}
                variant="h6"
              >
                First Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                sx={{ fontSize: "15px", color: "black" }}
                variant="h6"
              >
                Last_name
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
                Email Address
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                sx={{ fontSize: "15px", color: "black" }}
                variant="h6"
              >
                Phone Number
              </Typography>
            </TableCell>

            <TableCell>
              <Typography
                sx={{ fontSize: "15px", color: "black" }}
                variant="h6"
              >
                Role Number
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                sx={{ fontSize: "15px", color: "black" }}
                variant="h6"
              >
                Course Id
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
                Status
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                sx={{ fontSize: "15px", color: "black" }}
                variant="h6"
              >
                'Approved(Yes/NO)'
              </Typography>
            </TableCell>
            <TableCell>
              <Chip color="secondary" label="Make Approved" />
            </TableCell>
          </TableRow>
        </TableHead>{" "}
        <TableBody>
          {allApprovedStudents.map((student, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {student.id}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {student.student_id}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {student.first_name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {student.last_name}
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
                  {student.course_id}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {student.semester}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {student.year}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {student.status}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {student.is_approved}
                </Typography>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    handleApprove(
                      student.student_id,
                      student.first_name,
                      student.last_name,
                      student.email_address
                    );
                  }}
                  sx={{ bgcolor: "orange" }}
                  variant="contained"
                >
                  Make Approved
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    handlePreview(student.student_id);
                  }}
                  sx={{ bgcolor: "purple" }}
                  variant="contained"
                >
                  Preview
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default approvedStudent;
