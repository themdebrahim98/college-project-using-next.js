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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import Cookies from "js-cookie";
import axios from "axios";
import { useSelector } from "react-redux";
import { CheckBox, Save } from "@mui/icons-material";

function pendingStudent() {
  const [allApprovedStudents, setallApprovedStudents] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(0);
  const data = useSelector((store) => store.user.userData.user_data.hod_data[0])
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
    const token = Cookies.get("access_key");

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
        alert(error);
      }
    };

    fetchAllApprovedStudents();
  }, []);

  const handleCheckboxChange = (event, id) => {
    const newRows = rows.map((row) =>
      row.id === id ? { ...row, checked: event.target.checked } : row
    );
    setRows(newRows);
  };
  return (
    <>
      <Box component={Paper}>
        <Box display="flex"
          alignItems="center"
          flexDirection={{ md: 'row'}}
          justifyContent={{ md: 'space-between'}}
          px={{ lg: 2, md: 2, sm: 0 }}
          gap={2}
          sx={{ mb: 2 }}
        >
          <FormControl fullWidth>
              <InputLabel id="selectsession" sx={{m:2}}>session</InputLabel>
              <Select
                labelId="selectsession"
                id="selectsession"
                label="Sessions"
                name="session"
                sx={{m:2}}
                // onChange={getInput}
                // value={studentDetails.gender}
              >
                <MenuItem>dsfdf</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <Button variant="contained" sx={{mr:2}} startIcon={<Save/>} color='success'>Save</Button>
            </FormControl>
        </Box>
      </Box>
      <Box component={Paper}>
        <Box display="flex"
          alignItems="center"
          flexDirection={{ md: 'row', xs: 'column' }}
          justifyContent={{ md: 'space-between', xs: 'center' }}
          px={{ lg: 2, md: 2, sm: 0 }}
          py={2}
          gap={2}>
          <Typography variant="h2" sx={{ ml: 1, fontWeight: 'bold' }}>Student List</Typography>

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
            <TableHead sx={{ fontWeight: "bold", background: '#03c9d7', }}>
              <TableRow>
                <TableCell>
                  <CheckBox />
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "15px", color: "black", fontWeight: 'bold' }}
                  >
                    Sl.no
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{ fontSize: "15px", color: "black", fontWeight: 'bold' }}
                    variant="h6"
                  >
                    Full Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{ fontSize: "15px", color: "black", fontWeight: 'bold' }}
                    variant="h6"
                  >
                    Session
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "15px", color: "black", fontWeight: 'bold' }}
                  >
                    Reg. no.
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{ fontSize: "15px", color: "black", fontWeight: 'bold' }}
                    variant="h6"
                  >
                    Roll No.
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{ fontSize: "15px", color: "black", fontWeight: 'bold' }}
                    variant="h6"
                  >
                    Course
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{ fontSize: "15px", color: "black", fontWeight: 'bold' }}
                    variant="h6"
                  >
                    Department
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{ fontSize: "15px", color: "black", fontWeight: 'bold' }}
                    variant="h6"
                  >
                    Year
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{ fontSize: "15px", color: "black", fontWeight: 'bold' }}
                    variant="h6"
                  >
                    Semester
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{ fontSize: "15px", color: "black", fontWeight: 'bold' }}
                    variant="h6"
                  >
                    DOB
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{ fontSize: "15px", color: "black", fontWeight: 'bold' }}
                    variant="h6"
                  >
                    Gender
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{ fontSize: "15px", color: "black", fontWeight: 'bold' }}
                    variant="h6"
                  >
                    Email
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{ fontSize: "15px", color: "black", fontWeight: 'bold' }}
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
                    <CheckBox checked={false} onChange={(event) => handleCheckboxChange(event, row.id)} />
                  </TableCell>
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
                      {student.current_session_id}
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
                      {student.year}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {student.semester}
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
