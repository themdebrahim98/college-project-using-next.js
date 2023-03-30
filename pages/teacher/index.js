import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import { InputLabel, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
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
  Drawer,
  Stack,
  Paper,
  TableContainer,
  FormControl,
  Select,
  MenuItem,
  TablePagination,
  InputAdornment,
  IconButton,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";

import BaseCard from "../../src/components/baseCard/BaseCard";
import Cookies from "js-cookie";
import axios from "axios";
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { lg: '30%', xs: '80%', sm: '50%' },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  minHeight: "70%",
};

function teachers() {
  const [inputs, setinputs] = useState({
    teacher_id: null,
    first_name: null,
    last_name: null,
    gender: null,
    phone_number: null,
    email_address: null,
    is_hod: null,
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [teacherDatas, setteacherDatas] = useState([]);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [teacherId, setteacherId] = useState("");
  const [allDepertments, setallDepertments] = useState([]);
  const [allCourses, setallCourses] = useState([]);
  const [department_id, setdepartment_id] = useState("");
  const [course_id, setcourse_id] = useState("");
  const [selectedTeacherData, setselectedTeacherData] = useState([]);
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

  const filteredData = teacherDatas.filter((row) =>
    [row.first_name, row.last_name].some((value) =>
      value.toLowerCase().includes(filterText.toLowerCase())
    )
  );
  const displayedData = filteredData.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  const closePannel = (e) => {
    setOpen2(false);
  };

  const handleModal1Close1 = () => setOpen1(false);
  const handleModal1Close2 = () => setOpen2(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setinputs((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(inputs);
  };
  const handleModal2 = (teacherData) => {
    setOpen2(true);
    console.log(teacherData);
    setselectedTeacherData([teacherData]);
  };

  const handleModal1 = (teacher_id) => {
    setOpen1(true);
    setteacherId(teacher_id);
  };

  useEffect(() => {
    console.log(Cookies.get("access_key"));
    const token = Cookies.get("access_key");

    const fetchTeacher = async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}get_all_teacher`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(res.data.data.teachers, "teacher");
      const allTeachers = res.data.data.teachers.map((elm, idx) => {
        return elm;
      });
      // console.log(allTeachers, "allkjdscnkvn");
      setteacherDatas(allTeachers);
    };

    const fetchAllDepertment = async () => {
      const res2 = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}get_departments`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res2.data.data.departments);
      setallDepertments([...res2.data.data.departments]);
    };

    const fetchALlCourse = async () => {
      const res2 = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}get_courses`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res2.data.data.courses);
      setallCourses([...res2.data.data.courses]);
    };

    fetchTeacher();
    fetchAllDepertment();
    fetchALlCourse();
  }, [open1]);

  const updateHod = async () => {
    const token = Cookies.get("access_key");
    const res = await axios.post(
      "https://test.diptodiagnostic.com/api/update_department_hod",
      { teacher_id: teacherId, department_id, course_id },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    alert("changed successfully.");
    setOpen1(false);
    console.log(res.data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("access_key");
    const res = await axios.post(
      "https://test.diptodiagnostic.com/api/add_teacher",
      inputs,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(inputs);
  };


  return (
    <>
      {/* make teacher as a hod modal */}
      <Modal
        open={open1}
        onClose={handleModal1Close1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} gap={5} display="flex" flexDirection="column">
          <Typography id="modal-modal-title" variant="h6" sx={{ fontWeight: 500, textAlign: "center" }} component="h2">
            Makes Teacher As A HOD
          </Typography>

          <Box
            sx={{ minWidth: 120 }}
            display="flex"
            flexDirection="column"
            gap={5}
          >
            <TextField
              value={teacherId}
              id="outlined-basic"
              variant="outlined"
              label="teacher Id"
              disabled
            />

            <FormControl>
              <InputLabel id="demo-simple-select-label2">
                Please select course
              </InputLabel>
              <Select
                labelId="demo-simple-select-label2"
                id="demo-simple-select2"
                value={course_id}
                onChange={(e) => {
                  setcourse_id(e.target.value);
                }}
              >
                {allCourses.length > 0 &&
                  allCourses.map((elm, idx) => {
                    return (
                      <MenuItem key={idx} value={elm.id}>
                        {elm.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="demo-simple-select1-label1">
                Please select department
              </InputLabel>
              <Select
                autoWidth={true}
                labelId="demo-simple-select1-label1"
                id="demo-simple-select1"
                value={department_id}
                onChange={(e) => {
                  setdepartment_id(e.target.value);
                }}
              >
                {allDepertments.length > 0 &&
                  allDepertments.map((elm, idx) => {
                    return (
                      <MenuItem key={idx} value={elm.id}>
                        {elm.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            <Button
              onClick={updateHod}
              type="submit"
              variant="contained"
              sx={{ marginTop: "25px" }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* teacher add modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ width: { xs: '100vw' } }}
      >
        <Box sx={style} gap={5}>
          <Typography sx={{ textAlign: 'center', fontWeight: 800 }}>Fills Teacher's Data</Typography>
          <Box gap={2} component="form" onSubmit={handleSubmit}>
            <Box
              sx={{
                marginTop: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                position: "relative",
              }}
            >

              <TextField
                onChange={handleChange}
                value={inputs.teacher_id}
                fullWidth
                autoComplete="1234"
                name="teacher_id"
                id="input-with-sx"
                label="Teacher Id"
                variant="standard"
              />
            </Box>
            <Box
              sx={{
                marginTop: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                position: "relative",
              }}
            >
              <TextField
                onChange={handleChange}
                value={inputs.first_name}
                fullWidth
                autoComplete="1234"
                name="first_name"
                id="input-with-sx"
                label="First Name"
                variant="standard"
              />
            </Box>
            <Box
              sx={{
                marginTop: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                position: "relative",
              }}
            >
              <TextField
                onChange={handleChange}
                value={inputs.last_name}
                fullWidth
                autoComplete="1234"
                name="last_name"
                id="input-with-sx"
                label="LastName"
                variant="standard"
              />
            </Box>
            <Box
              sx={{
                marginTop: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                position: "relative",
              }}
            >
              <TextField
                onChange={handleChange}
                value={inputs.gender}
                fullWidth
                autoComplete="1234"
                name="gender"
                id="input-with-sx"
                label="Gender"
                variant="standard"
              />
            </Box>
            <Box
              sx={{
                marginTop: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                position: "relative",
              }}
            >
              <TextField
                onChange={handleChange}
                value={inputs.phone_number}
                fullWidth
                autoComplete="1234"
                name="phone_number"
                id="input-with-sx"
                label="Phone No"
                variant="standard"
              />
            </Box>
            <Box
              sx={{
                width: "100%",
                marginTop: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                position: "relative",
              }}
            >
              <TextField
                onChange={handleChange}
                value={inputs.email_address}
                fullWidth
                autoComplete="1234"
                name="email_address"
                id="input-with-sx"
                label="Email"
                variant="standard"
              />
            </Box>
            <Box
              sx={{
                width: "100%",
                marginTop: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                position: "relative",
              }}
            >
              <TextField
                onChange={handleChange}
                value={inputs.is_hod}
                fullWidth
                autoComplete="1234"
                name="is_hod"
                id="input-with-sx"
                label="Make Hod"
                variant="standard"
              />
            </Box>
            <Button
              type="submit"
              sx={{ marginTop: "15px" }}
              variant="contained"
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* teacher table */}
      <Box component={Paper}>
        <Box
          display="flex"
          alignItems="center"
          flexDirection={{ md: 'row', xs: 'column' }}
          justifyContent={{ md: 'space-between', xs: 'center' }}
          p={{ lg: 2, md: 2, sm: 0 }}
          gap={2}
        >
          <Typography variant="h2" sx={{ p: 1, flexGrow: 1, fontWeight: 'bold' }}>
            Teacher List
          </Typography>
          <TextField
            size="small"
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
            sx={{
              order: {
                xs: "2",
                md: "0",
              }
            }}
          />
          {/* <Button onClick={handleOpen} variant="contained">Add Teacher</Button> */}
          <Fab variant="extended" size="small" color="primary" sx={{ p: 2 }} onClick={handleOpen}>Add Teacher</Fab>
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
              whiteSpace: "nowrap",
            }}
            size="small"
          >
            <TableHead sx={{ background: '#03c9d7', }}>
              <TableRow>
                <TableCell>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "15px", color: "black", fontWeight: 'bold' }}
                  >
                    Sl. No.
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "15px", color: "black", fontWeight: 'bold' }}
                  >
                    Teacher Id
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "15px", color: "black", fontWeight: 'bold' }}
                  >
                    Full Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "15px", color: "black", fontWeight: 'bold' }}
                  >
                    Gender
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "15px", color: "black", fontWeight: 'bold' }}
                  >
                    Email
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "15px", color: "black", fontWeight: 'bold' }}
                  >
                    Phone No.
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "15px", color: "black", fontWeight: 'bold' }}
                  >
                    {` Hod(yes/no)`}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "15px", color: "black", fontWeight: 'bold' }}
                  >
                    Make Hod
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "15px", color: "black", fontWeight: 'bold' }}
                  >
                    Preview{" "}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>{" "}
            <TableBody>
              {displayedData.map((teacher, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      {idx + 1}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      {teacher.teacher_id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      {teacher.first_name+' '+teacher.last_name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      {teacher.gender}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      {teacher.email_address}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      {teacher.phone_number}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      {teacher.is_hod == 1 ? "Yes" : "No"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {/* <Button
                      onClick={() => {
                        handleModal1(teacher.teacher_id);
                      }}
                      color="secondary"
                      variant="contained"
                    >
                      Make Hod
                    </Button> */}
                    <Fab variant="extended" color="primary" size="small" onClick={() => {
                      handleModal1(teacher.teacher_id);
                    }}>
                      Make Hod
                    </Fab>
                  </TableCell>
                  <TableCell>
                    {/* <Button
                      onClick={() => {
                        handleModal2(teacher);
                      }}
                      color="secondary"
                      variant="contained"
                    >
                      Previews
                    </Button> */}
                    <Fab variant="extended" color="warning" size="small" onClick={() => { handleModal2(teacher); }}>
                      Preview
                    </Fab>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20, 40]}
            component="div"
            count={teacherDatas.length}
            rowsPerPage={rowsPerPage}
            page={currentPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>

      {/* pannel for teacher preview */}
      <Box>
        {/* <Button variant="contained"> close</Button> */}
        <Drawer
          PaperProps={{
            sx: { width: { lg: '40%', md: '60%', xs: '100%' }, padding: "15px" },
          }}
          anchor="right"
          open={open2}
          onClose={closePannel}
          sx={{ zIndex: "10000" }}
        >
          <Button
            onClick={closePannel}
            variant="contained"
            sx={{ mt: 2, mb: 2, width: "10px" }}
          >
            Back
          </Button>
          {selectedTeacherData.length > 0 &&
            selectedTeacherData.map((elm, idx) => {
              return (
                <>
                  <Box sx={{ width: "100%" }}>
                    <Stack spacing={2}>
                      <Item sx={{ fontSize: "16px" }}>
                        Name: {elm.first_name + " " + elm.last_name}
                      </Item>
                      <Item sx={{ fontSize: "16px" }}>
                        Teacher ID: {elm.teacher_id}
                      </Item>
                      <Item sx={{ fontSize: "16px" }}>
                        Gender: {elm.gender}
                      </Item>
                      <Item sx={{ fontSize: "16px" }}>
                        Phone No.: {elm.phone_number}
                      </Item>
                      <Item sx={{ fontSize: "16px" }}>
                        Email: {elm.email_address}
                      </Item>
                      <Box
                        sx={{
                          textAlign: "center",
                          m: 1,
                          fontWeight: "medium",
                          fontSize: "h3.fontSize",
                        }}
                      >
                        HOD Department List
                      </Box>
                      {elm.hod_data ? (
                        elm.hod_data.map((elm2, idx2) => {
                          return (
                            <>
                              <Item key={idx2} sx={{ fontSize: "16px" }}>
                                Department name: {elm2.name}
                              </Item>
                              <Item key={idx2} sx={{ fontSize: "16px" }}>
                                Course name: {elm2.course_name}
                              </Item>
                            </>
                          );
                        })
                      ) : (
                        <Box
                          sx={{
                            textAlign: "center",
                            m: 1,
                            fontWeight: "medium",
                            fontSize: "h5.fontSize",
                          }}
                        >
                          No department
                        </Box>
                      )}
                    </Stack>
                  </Box>
                  {/* <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Item>
                          Name:{elm.first_name + ' ' + elm.last_name}
                      </Item>
                    </Grid>
                    <Grid item xs={12}>
                      <Item>
                          Email:{elm.email_address}
                      </Item>
                    </Grid>
                  </Grid> */}
                </>
              );
            })}
        </Drawer>
      </Box>
    </>
  );
}

export default teachers;
