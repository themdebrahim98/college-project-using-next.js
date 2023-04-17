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
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";
import { CheckBox } from "@mui/icons-material";
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
  width: { lg: "30%", xs: "80%", sm: "50%" },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  minHeight: "70%",
};

function Session() {
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
  const [newSesionData, setnewSesionData] = useState([]);


  const [inputsData, setinputsData] = useState({
    oddOrEven: "",
    description: "",
    startSession: "",
    endSession: "",
  });
  const [allSession, setallSession] = React.useState([]);

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

  const filteredData = allSession.filter((row) =>
    [row.name].some((value) =>
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

    const getAllSession = async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}get_all_session`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const allSession = res.data.data.sessions.map((elm, idx) => {
        return ({ ...elm, checked: false })
      });
      setallSession(allSession)
      console.log(allSession)
      // console.log(allSession, "allkjdscnkvn");
      // setteacherDatas(allTeachers);
    };


    getAllSession();


  }, []);

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
    console.log(inputsData);
    const token = Cookies.get("access_key");
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}add_session`,
        {
          name: `${inputsData.oddOrEven} ${inputsData.startSession}-${inputsData.endSession}`,
          description: inputsData.description,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.data.status == 1) {
        alert(res.data.data.message);
        setOpen(false);
      } else {
        alert(res.data.dada.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getNYears = (n) => {
    const years = [];
    const currentYear = new Date().getFullYear();
    const start = currentYear-5;
    for (let i = start; i <= currentYear + n; i++) {
      years.push(i);
    }

    return years;
  };

  const handleCheckboxChange = (event, id) => {
    const newRows = rows.map((row) =>
      row.id === id ? { ...row, checked: event.target.checked } : row
    );
    setnewSesionData(newRows);
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
          <Typography
            id="modal-modal-title"
            variant="h6"
            sx={{ fontWeight: 500, textAlign: "center" }}
            component="h2"
          >
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
        sx={{ width: { xs: "100vw" } }}
      >
        <Box sx={style} gap={2} display="flex" flexDirection="column">
          <Typography sx={{ textAlign: "center", fontWeight: 800 }}>
            Fills Session's Data
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="choose-even-odd-lebel">
            Choose Odd or Even
            </InputLabel>
            <Select
              labelId="choose-even-odd-lebel"
              id="choose-even-odd"
              label="Choose-Odd-or-Even"
              value={inputsData.oddOrEven}
              onChange={(e) => {
                setinputsData({ ...inputsData, oddOrEven: e.target.value });
              }}
            >
              <MenuItem value="ODD">ODD</MenuItem>
              <MenuItem value="EVEN">EVEN</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Choose Start Session Year
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label=" Choose-Star-Session-Year"
              value={inputsData.startSession}
              onChange={(e) => {
                setinputsData({
                  ...inputsData,
                  startSession: e.target.value,
                });
              }}
            >
              {getNYears(5).map((year) => {
                return <MenuItem value={year}>{year}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Choose End Session Year
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label=" Choose-end-Session-Year"
              value={inputsData.endSession}
              onChange={(e) => {
                setinputsData({ ...inputsData, endSession: e.target.value });
              }}
            >
              {getNYears(5).map((year) => {
                return <MenuItem value={year}>{year}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <TextField
            name="description"
            onChange={(e) => {
              setinputsData({ ...inputsData, description: e.target.value });
            }}
            label="Description"
            placeholder="Please Enter Description "
          />
          <Button
            onClick={handleSubmit}
            type="submit"
            sx={{ marginTop: "15px" }}
            variant="contained"
          >
            Submit
          </Button>
        </Box>
      </Modal>

      {/* teacher table */}
      <Box component={Paper}>
        <Box
          display="flex"
          alignItems="center"
          flexDirection={{ md: "row", xs: "column" }}
          justifyContent={{ md: "space-between", xs: "center" }}
          p={{ lg: 2, md: 2, sm: 0 }}
          gap={2}
        >
          <Typography
            variant="h2"
            sx={{ p: 1, flexGrow: 1, fontWeight: "bold" }}
          >
            Sessions List
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
              },
            }}
          />
          <Fab
            variant="extended"
            size="small"
            color="primary"
            sx={{ p: 2 }}
            onClick={handleOpen}
          >
            Add Session
          </Fab>
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
            <TableHead sx={{ background: "#03c9d7" }}>
              <TableRow>
                {/* <TableCell>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "15px",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    <CheckBox />
                  </Typography>
                </TableCell> */}
                <TableCell>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "15px",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    Sl. No.
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
                    Name
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
                    Description
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
                    Start Time
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
                    End Time
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
                    Updated At
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>{" "}
            <TableBody>
              {displayedData.map((elm, idx) => (
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
                      {elm.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      {elm.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      {elm.start_time}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      {elm.end_time}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      {new Date(elm.updated_at).toLocaleString()}
                    </Typography>
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
    </>
  );
}

export default Session;
