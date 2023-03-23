import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  TablePagination
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import Cookies from "js-cookie";
import axios from "axios";

function pendingStudent() {
  const [allApprovedStudents, setallApprovedStudents] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(0);


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
  
  const filteredData = allApprovedStudents.filter((row) =>
  [row.first_name, row.last_name].some((value) =>
  value.toLowerCase().includes(filterText.toLowerCase())
  )
  );
  const displayedData = filteredData.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );
  useEffect(() => {
    const token = Cookies.get("access_key");

    const fetchAllApprovedStudents = async () => {
      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}get_all_students`, null, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res.data);
        setallApprovedStudents(res.data.data.students);
      } catch (error) {
        alert(error);
      }
    };

    fetchAllApprovedStudents();
  }, []);
  
  return (
<Box component={Paper}>
      <TextField
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
        </TableHead>
        
          
          <TableBody>
            {displayedData.map((student, idx) => (
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
                    {student.first_name + " " + student.last_name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {student.dob}
                    {/* {new Date(student.dob)} */}
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
                    {student.semester}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {student.year}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 40]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

export default pendingStudent;
