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
  FormControl,
} from "@mui/material";
import styles from "../../styles/alert.module.css";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Button } from "@mui/material";
import Classes from "../user/Components/Classes";
import { Create } from "@mui/icons-material";
import axios from "axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import FeatherIcon from "feather-icons-react";
import ClassScheduleModal from "../user/Components/ClassScheduleModal";
import Swal from "sweetalert2";
import CreateClassModal from "../user/Components/CreateClassModal";
import UpdateClassModal from "../user/Components/UpdateClassModal";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ClassRoom() {
  const timePicker = useSelector((state) => state.timePicker);
  const [open1, setopen1] = useState(false);
  const [open2, setopen2] = useState(false);
  const [open3, setopen3] = useState(false);
  const [currClassId, setcurrClassId] = useState("");
  const [value, setvalue] = useState(0);
  const [allSubject, setallSubject] = useState([]);
  const [allClassess, setallClassess] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [currSubId, setCurrSubId] = useState("");
  const [inputData, setinputData] = useState({
    topic: "",
    schudelDate: "",
    remarks: "",

  });

  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(0);
  const user = useSelector((state) => state.user);
  const handleChange = (event, newValue) => {
    setvalue(newValue);
  };
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

  const filteredData = allSubject?.filter((sub) =>
    [
      sub.department_name,
      sub.year.toString(),
      sub.semester.toString(),
      sub.course_name,
    ].some((value) => value.toLowerCase().includes(filterText.toLowerCase()))
  );
  const displayedData = filteredData.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  // const handleScheduleChange = () => {

  // }
  useEffect(() => {
    const token = Cookies.get("access_key");
    const getALLSubjects = async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}get_all_subject`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const subjects = res.data.data.subjects.filter((sub, idx) => {
        return sub.teacher_id == user.userData.user_data.teacher_id;
      });
      setallSubject(subjects);
      console.log(subjects);
    };

    const getAllclasses = async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}get_classes_by_teacher_id`,
        {
          session_id: 1,
          teacher_id: user.userData.user_data.teacher_id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setallClassess(res.data.data.classes);
      console.log(res.data.data.classes);
    };
    getAllclasses();
    getALLSubjects();
  }, [value]);

  const SubmitScheduleClass = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}schedule_class`,
      {
        subject_id: currSubId,
        session_id: "1",
        topic: inputData.topic,
        scheduled_on: ` ${inputData.schudelDate}`,
        duration: `${timePicker.hour}:${timePicker.minuete}`,
        created_by: user.userData.user_data.teacher_id,
      },
      { headers: { Authorization: `bearer ${Cookies.get("access_key")}` } }
    );

    if (res.data.data.status == 1) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully Scheduled Class",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          container: `${styles["my-sweetalert2-container-class"]}`,
        },
      });
      setopen1(false);
    } else {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Something Went Wrong",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          container: `${styles["my-sweetalert2-container-class"]}`,
        },
      });
    }
  };
  const updateClass = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}update_class_complete_status`,
      {
        class_id: currClassId,
        duration: `${timePicker.hour}:${timePicker.minuete}`,
        remarks: inputData.remarks

      },
      { headers: { Authorization: `bearer ${Cookies.get("access_key")}` } }
    );

    if (res.data.data.status == 1) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully Scheduled Class",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          container: `${styles["my-sweetalert2-container-class"]}`,
        },
      });
      setopen3(false);
    } else {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Something Went Wrong",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          container: `${styles["my-sweetalert2-container-class"]}`,
        },
      });
    }
  };
  const handleScheduleChange = (id) => {
    setopen1(true);
    setCurrSubId(id);
  };

  const handleModal1Close1 = () => {
    setopen1(false);
  };
  const handleModal1Close2 = () => {
    setopen2(false);
  };
  const handleModal1Close3 = () => {
    setopen3(false);
  };

  const handleInputChange = (e) => {
    setinputData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreateClass = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}create_class`,
      { subject_id: "" }
    );
  };
  return (
    <>
      <ClassScheduleModal
        handleModal1Close1={handleModal1Close1}
        open1={open1}
        currSubId={currSubId}
        inputData={inputData}
        setinputData={setinputData}
        handleInputChange={handleInputChange}
        updateClass={SubmitScheduleClass}
      />
      <CreateClassModal
        handleModal1Close2={handleModal1Close2}
        open2={open2}
        currSubId={currSubId}
        inputData={inputData}
        setinputData={setinputData}
        handleInputChange={handleInputChange}
        handleCreateClass={handleCreateClass}
        allSubjects={allSubject}
      />
      <UpdateClassModal
        handleModal1Close3={handleModal1Close3}
        open3={open3}
        inputData={inputData}
        setinputData={setinputData}
        handleInputChange={handleInputChange}
        updateClass={updateClass}

      />

      <Box sx={{ mb: 2 }}>
        <Box
          display="flex"
          alignItems="center"
          flexDirection={{ md: "row", xs: "column" }}
          justifyContent={{ md: "end", xs: "center" }}
          p={1}
          gap={2}
        >
          <Button
            variant="contained"
            color="success"
            startIcon={<Create />}
            onClick={() => setopen2(true)}
          >
            Create New
          </Button>
        </Box>
      </Box>
      <Box sx={{ width: "100%" }} component={Paper}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Recent Classes" {...a11yProps(0)} />
            <Tab label="Shedule a Class" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <TextField
            placeholder="Filter any column..."
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
                      Update
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
                      Session Name
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
                      Subject Name
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
                      Topic
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
                      Scheduled On
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
                      Remark
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allClassess.map((elm, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => {

                          setopen3(true);
                          setcurrClassId(elm.id)
                        }}
                      >
                        Update
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6">
                        {elm.session_name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6">
                        {elm.subject_name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6">
                        {elm.topic}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6">
                        {elm.scheduled_on}
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
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TextField
            placeholder="Filter any column..."
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
                      Shedule
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
                      Course Name
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
                      Depart Name
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
                      Year
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedData.map((sub, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleScheduleChange(sub.id)}
                      >
                        Schedule
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6">
                        {sub.course_name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6">
                        {sub.department_name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6">
                        {sub.semester}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6">
                        {sub.year}
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
          {/* <Classes/> */}
        </TabPanel>
      </Box>
    </>
  );
}
