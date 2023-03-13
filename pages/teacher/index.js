import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
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
  Paper 
} from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";
import { BASE_URL } from "../../commonVariable";
import Cookies from "js-cookie";
import axios from "axios";
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
  minWidth: "30%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
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
    setteacherId(allTeachers);
  };

  useEffect(() => {
    console.log(Cookies.get("access_key"));
    const token = Cookies.get("access_key");

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

  const btnData = (
    <Button variant="contained" sx={{ ml: "auto" }} onClick={handleOpen}>
      Add Teacher
    </Button>
  );
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} gap={5}>
          <Box gap={2} width="100" component="form" onSubmit={handleSubmit}>
            <Box
              sx={{
                marginTop: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                position: "relative",
              }}
            >
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
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
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
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
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
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
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
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
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
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
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
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
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
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
      <BaseCard
        title="Teacher List"
        button="true"
        buttonData={btnData}
        sx={{ overFlow: "scroll" }}
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
          </TableHead>{" "}
          <TableBody>
            {teacherDatas.map((teacher, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    {teacher.id}
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
                    {teacher.first_name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    {teacher.last_name}
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
                  <Typography color="textSecondary" variant="h6">
                    {teacher.email_address}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {teacher.phone_number}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {teacher.is_hod}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Button color="secondary" variant="contained">
                    Make Hod
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      handleModal2(teacher);
                    }}
                    color="secondary"
                    variant="contained"
                  >
                    Preview
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </BaseCard>
      <Box>
        {/* <Button variant="contained"> close</Button> */}
        <Drawer
        
        PaperProps={{
          sx: { width: "40%",padding:'15px' },
        }}
          anchor="right"
          open={open2}
          onClose={closePannel}
          sx={{ zIndex: "10000" }}
        >
          <Button
            onClick={closePannel}
            variant="contained"
            sx={{ mt: 2,mb: 2,width:"10px" }}
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
