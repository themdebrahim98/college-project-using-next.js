import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FilterListIcon from '@mui/icons-material/FilterList';
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
  TextField,
} from "@mui/material";

import Link from "next/link";
import BaseCard from "../../src/components/baseCard/BaseCard";
import Cookies from "js-cookie";
import axios from "axios";
import FeatherIcon from "feather-icons-react";
import { getOrdinals } from "../../src/Helper/functions";
function pendingStudent() {
  const [allPendingStudents, setallPendingStudents] = useState([]);
  const [open, setopen] = useState(false);
  const [currStudentTobeDeleted, setcurrStudentTobeDeleted] = useState({});
  const [loading, setloading] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [toggleFilter, settoggleFilter] = React.useState(false);



  const data = useSelector(
    (store) => store?.user?.userData?.user_data?.hod_data[0]
  );
  const [filters, setfilters] = useState({
    first_name: "",
  });
  const [filtered, setFiltered] = useState([]);

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

  const handleFilterChange = (event) => {
    setfilters((prevFilters) => ({
      ...prevFilters,
      [event.target.name]: event.target.value,
    }));
  };

  const tempFilteredData = allPendingStudents.filter((item) => {
    return Object.entries(filters).every(([key, value]) => {
      return item[key].toString().toLowerCase().includes(value);
    });
  });

  const displayedData = tempFilteredData.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );
  const handleClearFilters = () => {
    setfilters({});
  };

  
  const selectCurrentStudentData = (student) => {
    console.log(student);
    setcurrStudentTobeDeleted(student);
    setopen(true);
  };
  const handleApprove = async (student) => {
    setloading(true);
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
      setloading(false);
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
          { department_id: data.department_id, course_id: data.course_id },
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
    alert("cancelleed succsessfully");
  };

  const handleConfirm = () => {
    // Handle the confirmation here
    handleApprove(currStudentTobeDeleted);
    setopen(false);
    console.log("Confirmed!");
  };

  return (
    <Box component={Paper}>
      <Box
        display="flex"
        alignItems="center"
        flexDirection={{ md: "row", xs: "column" }}
        justifyContent={{ md: "space-between", xs: "center" }}
        px={{ lg: 2, md: 2, sm: 0 }}
        py={2}
        gap={2}
      >
        <Typography variant="h2" sx={{ ml: 1, fontWeight: "bold" }}>
          Pending students
        </Typography>

        
      </Box>
      <TableContainer
        component={Paper}
        style={{ overflowX: "auto" }}
        className="table_scroll"
        sx={{ p: 1 }}
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
            whiteSpace: "nowrap",
          }}
          size="small"
        >
             <IconButton onClick={() => settoggleFilter(!toggleFilter)}>
              <FilterListIcon />
            </IconButton>
       
          <TableRow>
           { toggleFilter && <TableCell size="small">
              <Button color="secondary" onClick={handleClearFilters}>
                Clear All Filter
              </Button>
            </TableCell>}
            { 
            toggleFilter &&
            
            [
              "first_name",
              "last_name",
              "student_id",
              "roll_number",
              "course_name",
              "department_name",
              "year",
              "semester",
              "dob",
              "gender",
              "email_address",
              "phone_number",
            ].map((elm, idx) => {
              return (
                <TableCell size="small">
                  <TextField
                    onChange={handleFilterChange}
                    name={elm}
                    value={filters[elm] || ""}
                    size="small"
                  />
                </TableCell>
              );
            })}
          </TableRow>
          <TableHead sx={{ background: "#03c9d7" }}>
            <TableRow>
              {[
                "Action",
                "First Name",
                "Last Name",
                "Reg No",
                "Roll No",
                "Course",
                "Department",
                "Year",
                "Semester",
                "Dob",
                "Gender",
                "Email",
                "Phone No",
              ].map((elm) => {
                return (
                  <TableCell>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "15px",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      {elm}
                    </Typography>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>{" "}
          <TableBody>
            {displayedData.map((student, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <Button
                    disabled={loading}
                    onClick={() => {
                      selectCurrentStudentData(student);
                    }}
                    sx={
                      student.is_approved
                        ? { bgcolor: "green" }
                        : { bgcolor: "crimson" }
                    }
                    variant="contained"
                    size="small"
                  >
                    {loading &&
                    currStudentTobeDeleted.student_id == student.student_id
                      ? "Approving..."
                      : "Approve"}
                  </Button>
                </TableCell>

                {[
                  "first_name",
                  "last_name",
                  "student_id",
                  "roll_number",
                  "course_name",
                  "department_name",
                  "year",
                  "semester",
                  "dob",
                  "gender",
                  "email_address",
                  "phone_number",
                ].map((elm) => {
                  return (
                    <TableCell>
                      <Typography color="textSecondary" variant="h6">
                        {student[elm]}
                      </Typography>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 40]}
          component="div"
          count={filtered.length}
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
