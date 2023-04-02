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
  TablePagination,
  Button,
  FormControl,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FeatherIcon from "feather-icons-react";
import Cookies from "js-cookie";
import axios from "axios";
import { useSelector } from "react-redux";
import NextLink from "next/link";
import { getOrdinals } from "../../src/Helper/functions";

function pendingStudent() {
  const [allApprovedStudents, setallApprovedStudents] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const data = useSelector(
    (state) => state.user.userData.user_data?.hod_data[0]
  );
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

  const filteredData = allApprovedStudents?.filter((row) =>
    [row.first_name, row.last_name].some((value) =>
      value.toLowerCase().includes(filterText.toLowerCase())
    )
  );
  const displayedData = filteredData.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );
  useEffect(() => {
    console.log(data, "data");
    const token = Cookies.get("access_key");
    if (data != "" && data != undefined) {
      const fetchAllApprovedStudents = async () => {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}get_all_students`,
            { department_id: data.department_id, course_id: data.course_id },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          console.log(res.data);
          setallApprovedStudents(res.data.data.students);
        } catch (error) {
          console.log(error);
        }
      };

      fetchAllApprovedStudents();
    }
  }, []);

  return (
    <>
      {data != undefined &&
      <Box component={Paper}>
        <Box
          display="flex"
          alignItems="center"
          flexDirection="row"
          justifyContent={{ md: "start", xs: "center" }}
          gap={1}
          sx={{ mb: 2, flexWrap: "wrap" }}
        >
          <Button
            variant="contained"
            color="warning"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{ m: 1 }}
          >
            Session Registration
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            size="small"
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <NextLink
              style={{ color: "inherit", textDecoration: "none", p: 1 }}
              href="/session/studentsessionassign"
            >
              <MenuItem onClick={handleClose}>New Session Assign</MenuItem>
            </NextLink>
            <NextLink
              style={{ color: "inherit", textDecoration: "none", p: 1 }}
              href="/session/updatesessionstudents"
            >
              <MenuItem onClick={handleClose}>Update Session</MenuItem>
            </NextLink>
          </Menu>
          {/* <NextLink style={{ color: "inherit", textDecoration: 'none',padding: '10px'}} href="/session/studentsessionassign">
            <Button variant="contained" color="warning">
              Senssion Registration
            </Button>
          </NextLink> */}
          <NextLink
            style={{
              color: "inherit",
              textDecoration: "none",
              padding: "10px",
            }}
            href="/subject/studentSubjectRegistration"
          >
            <Button variant="contained" color="success">
              Subject Registration
            </Button>
          </NextLink>
        </Box>
      </Box>

          }
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
            Student List
          </Typography>

          <TextField
            size="small"
            sx={{ p: 1, float: "right" }}
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
          sx={{ p: 1 }}
        >
          <Table
            aria-label="simple table"
            sx={{
              // p: 2,
              whiteSpace: "nowrap",
            }}
            size="small"
          >
            <TableHead sx={{ fontWeight: "bold", background: "#03c9d7" }}>
              <TableRow>
                <TableCell>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "15px",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    Sl.no
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      color: "black",
                      fontWeight: "bold",
                    }}
                    variant="h6"
                  >
                    Full Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "15px",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    Reg. no.
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      color: "black",
                      fontWeight: "bold",
                    }}
                    variant="h6"
                  >
                    Roll No.
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      color: "black",
                      fontWeight: "bold",
                    }}
                    variant="h6"
                  >
                    Course
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      color: "black",
                      fontWeight: "bold",
                    }}
                    variant="h6"
                  >
                    Department
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      color: "black",
                      fontWeight: "bold",
                    }}
                    variant="h6"
                  >
                    Year
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      color: "black",
                      fontWeight: "bold",
                    }}
                    variant="h6"
                  >
                    Semester
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      color: "black",
                      fontWeight: "bold",
                    }}
                    variant="h6"
                  >
                    DOB
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      color: "black",
                      fontWeight: "bold",
                    }}
                    variant="h6"
                  >
                    Gender
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      color: "black",
                      fontWeight: "bold",
                    }}
                    variant="h6"
                  >
                    Email
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      color: "black",
                      fontWeight: "bold",
                    }}
                    variant="h6"
                  >
                    Phone No.
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {displayedData.map((student, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {idx + 1}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {student.first_name + " " + student.last_name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {student.student_id}
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
                      {getOrdinals(student.year)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {getOrdinals(student.semester)}
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20, 40]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={currentPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
    </>
  );
}

export default pendingStudent;
