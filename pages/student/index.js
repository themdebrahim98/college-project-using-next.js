import React, { useEffect, useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
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

function AllStudents() {
  const [allApprovedStudents, setallApprovedStudents] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [filters, setfilters] = useState({
    first_name: "",
  });
  const [filtered, setFiltered] = useState([]);
  const [toggleFilter, settoggleFilter] = useState(false);

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

  const handleClearFilters = () => {
    setfilters({});
  };

  // const filteredData = allApprovedStudents?.filter((row) =>
  //   [row.first_name, row.last_name].some((value) =>
  //     value.toLowerCase().includes(filterText.toLowerCase())
  //   )
  // );
  const handleFilterChange = (event) => {
    setfilters((prevFilters) => ({
      ...prevFilters,
      [event.target.name]: event.target.value,
    }));
  };

  const tempFilteredData = allApprovedStudents.filter((item) => {
    return Object.entries(filters).every(([key, value]) => {
      return item[key].toString().toLowerCase().includes(value);
    });
  });

  const displayedData = tempFilteredData.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );
  // const displayedData = filteredData.slice(
  //   currentPage * rowsPerPage,
  //   currentPage * rowsPerPage + rowsPerPage
  // );
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
          const allStudents = res.data.data.students.map((elm) => ({
            ...elm,
            dob: new Date(elm.dob).toLocaleDateString(),
          }));
          console.log(allStudents);
          setallApprovedStudents(allStudents);
        } catch (error) {
          console.log(error);
        }
      };

      fetchAllApprovedStudents();
    }
  }, []);

  return (
    <>
      {data != undefined && (
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
      )}
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
               <IconButton onClick={() => settoggleFilter(!toggleFilter)}>
              <FilterListIcon />
            </IconButton>
            <TableRow>
              {toggleFilter && (
                <TableCell size="small">
                  <Button color="secondary" onClick={handleClearFilters}>
                    Clear All Filter
                  </Button>
                </TableCell>
              )}
              {toggleFilter &&
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
           
            <TableHead sx={{ fontWeight: "bold", background: "#03c9d7" }}>
              <TableRow>
                {[
                  "Sl.no",
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
            </TableHead>

            <TableBody>
              {displayedData.map((student, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {idx + 1}
                    </Typography>
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
    </>
  );
}

export default AllStudents;
