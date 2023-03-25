import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TablePagination,
  InputAdornment,
  IconButton,
  TextField
} from "@mui/material";

import Link from "next/link";
import BaseCard from "../../src/components/baseCard/BaseCard";
import Cookies from "js-cookie";
import axios from "axios";
import FeatherIcon from "feather-icons-react";
function pendingStudent() {
  const [allPendingStudents, setallPendingStudents] = useState([]);
  const [open, setopen] = useState(false);
  const [currStudentTobeDeleted, setcurrStudentTobeDeleted] = useState({});
  const [loading, setloading] = useState(false)
  const [filterText, setFilterText] = useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(0);
  const data = useSelector((store)=>store.user.userData.user_data.hod_data[0])


  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };


  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value);
  };

  const filteredData = allPendingStudents.filter((row) =>
    [row.first_name, row.last_name].some((value) =>
      value.toLowerCase().includes(filterText.toLowerCase())
    )
  );
  const displayedData = filteredData.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  const selectCurrentStudentData = (student) => {
    console.log(student)
    setcurrStudentTobeDeleted(student);
    setopen(true)
  };
  const handleApprove = async (student) => {
    setloading(true)
    const { student_id, first_name, last_name, email_address } = student;
    const token = Cookies.get("access_key");
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}approve_student`,
        {
          student_id,
          first_name,
          last_name,
          email_address,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const filterPendingStudent = allPendingStudents.filter((elm) => {
        return elm.student_id != student_id;
      });
      setallPendingStudents(filterPendingStudent);
      console.log(res.data);
      setloading(false)
      alert("approved succcessfully");
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const token = Cookies.get("access_key");

    const fetchallPendingStudents = async () => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}get_nonapproved_students`,
          {department_id:data.department_id, course_id:data.course_id},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(res.data);
        setallPendingStudents(res.data.data.nonapprovedstudents);
      } catch (error) {
        alert(error);
      }
    };

    fetchallPendingStudents();
  }, []);
  const handlePreview = (student_id) => {
    console.log(student_id);
  };

  const handleClose = () => {
    setopen(false);
    alert("cancelleed succsessfully")
  };

  const handleConfirm = () => {
    // Handle the confirmation here
    handleApprove(currStudentTobeDeleted);
    setopen(false);
    console.log("Confirmed!");
  };

  return (
    <Box component={Paper}>
      <Box display="flex"
        alignItems="center"
        flexDirection={{ md: 'row', xs: 'column' }}
        justifyContent={{ md: 'space-between', xs: 'center' }}
        px={{ lg: 2, md: 2, sm: 0 }}
        py={2}
        gap={2}>
        <Typography variant="h2" sx={{ ml: 1, fontWeight: 'bold' }}>
          Pending students
        </Typography>

        <TextField
          size="small"
          sx={{ p: 1, float: 'right' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <FeatherIcon icon="filter" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          label="Filter table"
          value={filterText}
          onChange={handleFilterTextChange}
        />
      </Box>
      <TableContainer
        component={Paper}
        style={{ overflowX: "auto" }}
        className="table_scroll"
      >
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to perform this action?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleConfirm} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
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
                <Typography variant="h6">Sl. No.</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Student Id</Typography>
              </TableCell>
              <TableCell>
                <Typography
                  sx={{ fontSize: "15px", color: "black" }}
                  variant="h6"
                >
                  Full Name
                </Typography>
              </TableCell>
              {/* <TableCell>
                <Typography
                  sx={{ fontSize: "15px", color: "black" }}
                  variant="h6"
                >
                  Last_name
                </Typography>
              </TableCell> */}
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
                  Course
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
                  Approved(Yes/NO)
                </Typography>
              </TableCell>
              <TableCell>
                <Chip color="secondary" label="Make Approved" />
              </TableCell>
            </TableRow>
          </TableHead>{" "}
          <TableBody>
            {displayedData.map((student, idx) => (
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
                {/* <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {student.first_name}
                  </Typography>
                </TableCell> */}
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {student.first_name+''+student.last_name}
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
                    {student.is_approved != 0 ? "Yes" : "No"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Button
                    disabled={loading}
                    onClick={() => {
                      selectCurrentStudentData(
                        student
                        // student.student_id,
                        // student.first_name,
                        // student.last_name,
                        // student.email_address
                      );
                    }}
                    sx={
                      student.is_approved
                        ? { bgcolor: "green" }
                        : { bgcolor: "crimson" }
                    }
                    variant="contained"
                  >
                    {loading && currStudentTobeDeleted.student_id == student.student_id ? "Approving..." : ' Make Approved'}

                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 40]}
          component="div"
          count={displayedData.length}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

    </Box>
  );
}

export default pendingStudent;
