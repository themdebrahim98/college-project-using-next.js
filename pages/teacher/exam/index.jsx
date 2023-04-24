import React, { useState, useEffect, useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Swal from "sweetalert2";
import styles from '../.././/../styles/alert.module.css'
import {
  Box,
  Button,
  Drawer,
  Fab,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  List,
  ListItem,
  Modal,
  Autocomplete
} from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "30%",
  bgcolor: "background.paper",
  boxShadow: 20,
  p: 4,
  borderRadius: "5px",
};

import Link from "next/link";
import { BookmarkAdd, Close, RemoveRedEyeRounded } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";



function Exam() {

  const [allExamData, setallExamData] = useState([]);
  const [fetchDataLoading, setFetchDataLoading] = useState(false);
  const [open, setopen] = useState(false);
  const [open2, setopen2] = useState(false);
  const [allCourses, setallCourses] = useState([]);
  const [currSessionId, setcurrSessionId] = useState("");
  const [currCourseId, setcurrCourseId] = useState("");
  const [isSellectSession, setisSellectSession] = React.useState(false);
  const [isSellectCourse, setisSellectCourse] = React.useState(false);
  const [currExamTobeUpdate, setcurrExamTobeUpdate] = React.useState("");


  const [allSession, setallSession] = React.useState([]);


  const [allSubjectsOfTeacher, setAllSubjectsOfTeacher] = useState([]);
  const [subjectsOfCourse, setsubjectsOfCourse] = useState([]);

  const [informationOfExam, setInformationOfExam] = useState({
    subject: "",
    name: "",
    description: "",
    date: new Date().toISOString().substring(0, 10),
    total_marks: "",
  });

  const [updatedInformation, setupdatedInformation] = useState({
    subject: "",
    name: "",
    description: "",
    date: new Date().toISOString().substring(0, 10),
    total_marks: "",
  });

  const user = useSelector((state) => state.user.userData.user_data);

  const handlecourseChange = (e, option) => {
    console.log(allSubjectsOfTeacher, "check")
    if (allSubjectsOfTeacher) {
      const filterSubject = allSubjectsOfTeacher.filter((elm) => elm?.course_id == option?.id)
      setsubjectsOfCourse(filterSubject)

    }
    setcurrCourseId(option?.id);
    setisSellectCourse(true);
  };
  const handleSessionChange = (e, option) => {
    // setcurrSessionId("")
    // setisSellectSession(false)
    setcurrSessionId(option?.id);
    setisSellectSession(true);
  };

  useEffect(() => {
    const token = Cookies.get("access_key");
    const getAllSession = async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}get_all_session`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const sessions = res.data.data.sessions;
      const data = sessions.map((elm) => ({ id: elm.id, label: elm.name }));
      setallSession(data);

    };

    getAllSession()
    const fetchALlCourse = async () => {
      const res2 = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}get_courses`,
        null
      );
      console.log(res2.data.data.courses, "course")
      const data = res2.data.data.courses.map((elm) => ({ id: elm.id, label: elm.name }));
      setallCourses(data);
    };
    fetchALlCourse();

    const getALLSubjects = async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}get_all_subject`,
        null,
        {
          headers: { Authorization: `Bearer ${Cookies.get("access_key")}` },
        }
      );
      console.log(res.data.data.subjects, "allsub")
      const subjects = res.data.data.subjects.map((elm, idx) => {
        if (elm.assigned_teacher == user.teacher_id) {
          return elm;
        }
      });
      console.log(subjects, "sub");
      setAllSubjectsOfTeacher(subjects);
    };



    getALLSubjects();

  }, []);

  useEffect(() => {
    if (currCourseId && currSessionId) {
      setFetchDataLoading(true);
      const fetchAllExamData = async () => {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}get_all_exam_by_teacherId`,
          {
            session_id: currSessionId,
            teacher_id: user.teacher_id,

          },
          { headers: { Authorization: `bearer ${Cookies.get("access_key")}` } }

        );

        const temp = res.data.data.exams.filter((elm) => elm.course_id === currCourseId && elm.session_id === currSessionId)
        setallExamData(temp)
        if (res.data.data.status.status == 1) {
          setFetchDataLoading(false);
        } else {
          setFetchDataLoading(false);
        }

      }
      fetchAllExamData()

    }



  }, [currCourseId, currSessionId])

  const handleChange = (e) => {
    console.log(e.target.value);
    setInformationOfExam((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChange2 = (e) => {
    setupdatedInformation((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const closeModal = (e) => {
    setopen(false);
  };

  const handleAddExamDrawer = () => {
    setopen(true);
  };


  const updateExamData = async (row) => {
    setcurrExamTobeUpdate(row)
    setopen2(true);
    setupdatedInformation({
      subject: row.subject_name,
      name: row?.name,
      description: row?.description,
      date: new Date(row?.updated_at).toISOString().substring(0, 10),
      total_marks: row?.total_marks,

    });
  };

  const closeModal2 = () => {
    setopen2(true);
  };


  const handleSubmit = async (type) => {
    try {

      let res;
      if (type === "ADD_EXAM") {
        res = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}create_exam`,
          {
            subject_id: informationOfExam.subject,
            session_id: currSessionId,
            name: informationOfExam.name,
            description: informationOfExam.description,
            date: informationOfExam.date,
            total_marks: informationOfExam.total_marks,
            created_by: user.teacher_id,
          },
          {
            headers: { Authorization: `Bearer ${Cookies.get("access_key")}` },
          }
        );

      } else {
        res = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}update_exam_details`,
          {
            exam_id: currExamTobeUpdate.id,
            subject_id: currExamTobeUpdate.subject_id,
            session_id: currSessionId,
            name: updatedInformation.name,
            description: updatedInformation.description,
            date: updatedInformation.date,
            total_marks: updatedInformation.total_marks,
            created_by: user.teacher_id,
          },
          {
            headers: { Authorization: `Bearer ${Cookies.get("access_key")}` },
          }
        );
      }
      if (res.data.data.status == 1) {
        setopen(false)
        setopen2(false)
        Swal.fire({
          icon: 'success',
          title: 'You have successfully updated exam data',
          showConfirmButton: true,
          confirmButtonText: 'I understand..!'
        })

        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}get_all_exam_by_teacherId`,
          {
            session_id: currSessionId,
            teacher_id: user.teacher_id,

          },
          { headers: { Authorization: `bearer ${Cookies.get("access_key")}` } }

        );


        const filterSubject = res.data.data.exams.filter((elm) => elm?.course_id == currCourseId)
        setallExamData(filterSubject)


      } else {
        setopen(true)

        Swal.fire({
          icon: "warning",
          title: "Oopps....",
          text: `${res.data.data.message}`,
          timer: 1500,
          customClass: {
            container: `${styles["my-sweetalert2-container-class"]}`,
          },
        });
      }

    } catch (err) {
      console.log(err)
    }


  };

  return (
    <Box component={Paper}>

      <Box display="flex"
        alignItems="center"
        flexDirection={{ md: "row", xs: "column" }}
        justifyContent={{ md: "space-between", xs: "center" }}
        px={{ lg: 2, md: 2, sm: 0 }}
        py={2}
        gap={2}>
        <FormControl fullWidth sx={{ display: "flex" }}>
          <Autocomplete

            // loading
            onChange={handlecourseChange}
            id="controllable-states-demo"
            options={allCourses}
            sx={{ m: 1 }}
            renderInput={(params) => (
              <TextField {...params} label="Current course" />
            )}
          />
        </FormControl>

        <FormControl fullWidth>
          <Autocomplete

            // loading
            onChange={handleSessionChange}
            id="controllable-states-demo"
            options={allSession}
            sx={{ m: 1 }}
            renderInput={(params) => (
              <TextField {...params} label=" Session" />
            )}
          />
        </FormControl>
      </Box>


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
          Exam List{" "}
          <LoadingButton
            size="small"
            loading={fetchDataLoading}
            loadingIndicator="Loading.."
            loadingPosition="end"
          // variant="outlined"
          >
          </LoadingButton>
        </Typography>
        <Fab
          variant="extended"
          size="small"
          color="primary"
          sx={{ p: 2 }}
          onClick={handleAddExamDrawer}
          disabled={!isSellectSession || currSessionId == undefined}
        >
          Add Exam
        </Fab>
      </Box>
      {
        isSellectCourse && isSellectSession &&
        <TableContainer sx={{ overflowX: "auto", p: 1 }} className="table_scroll">
          <Table
            aria-label="simple table"
            sx={{
              whiteSpace: "nowrap",
            }}
            size="small"
          >
            <TableHead sx={{ background: "#03c9d7" }}>
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
                    Subject Name
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
                    Course
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
                    Exam date
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
                    Marks
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
                    Action
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allExamData?.length > 0 ? allExamData.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.subject_name}
                  </TableCell>
                  <TableCell>{row.course_name}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.total_marks}</TableCell>
                  <TableCell>
                    <Link href={`exam/givemarks/${row.id}`}>
                      <Fab
                        variant="extended"
                        size="small"
                        color="success"
                        title="give marks"
                      >
                        <BookmarkAdd />
                      </Fab>
                    </Link>
                    <Link href={`exam/examdetails/${row.id}`}>
                      <Fab
                        variant="extended"
                        sx={{ m: 1 }}
                        size="small"
                        color="primary"
                        title="Exam Details"
                      >
                        <RemoveRedEyeRounded />
                      </Fab>
                    </Link>

                    <Fab
                      variant="extended"
                      sx={{ m: 1, borderRadius: "50%" }}
                      size="small"
                      color="primary"
                      title="Exam Details"
                      onClick={() => {
                        updateExamData(row);
                      }}
                    >
                      <EditIcon />
                    </Fab>
                  </TableCell>
                </TableRow>
              )) :
                <TableRow>
                  <TableCell component="th" scope="row" colSpan={7} align="center">
                    <LoadingButton
                      size="large"
                      loading={fetchDataLoading}
                      loadingIndicator="Loading Data…"
                    // variant="outlined"
                    >
                      <span>No Data Found</span>
                    </LoadingButton>
                  </TableCell>
                </TableRow>}
            </TableBody>
          </Table>
        </TableContainer>

      }

      {/* add exaam */}
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} gap={5} display="flex" flexDirection="column">
          <Button
            onClick={() => setopen(false)}
            variant="contained"
            color="danger"
            sx={{ color: "#fff", mt: 2, mb: 2 }}
            startIcon={<Close />}
          >
            Close
          </Button>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Subject</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={informationOfExam.subject}
              label="subject"
              onChange={(e) => {
                setInformationOfExam((prev) => ({
                  ...prev,
                  subject: e.target.value,
                }));
              }}
              name="subject"
            >

              {subjectsOfCourse?.length > 0 ? subjectsOfCourse.map((elm, idx) => (
                <MenuItem value={elm?.id}>{elm?.name}</MenuItem>
              )) :
                <MenuItem value="" disabled>No subject available</MenuItem>
              }
            </Select>
          </FormControl>

          <TextField
            id="name"
            type="text"
            name="name"
            value={informationOfExam.name}
            label="Name"
            variant="outlined"
            fullWidth
            autoComplete="off"
            onChange={handleChange}
          />
          <TextField
            id="description"
            type="text"
            name="description"
            value={informationOfExam.description}
            label="Description"
            variant="outlined"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="date"
            type="datetime-local"
            defaultValue={new Date().toISOString().substring(0, 10)}
            name="date"
            value={informationOfExam.date}
            label="Date"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
          <TextField
            id="total_marks"
            type="number"
            name="total_marks"
            value={informationOfExam.total_marks}
            label="Total Marks"
            variant="outlined"
            fullWidth
            onChange={handleChange}
          />
          <Button variant="contained" color="primary" onClick={() => { handleSubmit("ADD_EXAM") }}>
            Create Exam
          </Button>
        </Box>
      </Modal>

      {/* update exam data */}
      <Modal
        open={open2}
        onClose={closeModal2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} gap={5} display="flex" flexDirection="column">
          <Button
            onClick={() => setopen2(false)}
            variant="contained"
            color="danger"
            sx={{ color: "#fff", mt: 2, mb: 2 }}
            startIcon={<Close />}
          >
            Close
          </Button>
          <TextField
            type="text"
            name="subject"
            value={updatedInformation.subject}
            label="Name"
            variant="outlined"
            fullWidth
            autoComplete="off"
            disabled
          />

          <TextField
            id="name"
            type="text"
            name="name"
            value={updatedInformation.name}
            label="Name"
            variant="outlined"
            fullWidth
            autoComplete="off"
            onChange={handleChange2}
          />
          <TextField
            id="description"
            type="text"
            name="description"
            value={updatedInformation.description}
            label="Description"
            variant="outlined"
            onChange={handleChange2}
            fullWidth
          />
          <TextField
            id="date"
            type="datetime-local"
            defaultValue={new Date(updatedInformation.date).toISOString().substring(0, 10)}
            name="date"
            value={updatedInformation.date}
            label="Date"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange2}
          />
          <TextField
            id="total_marks"
            type="number"
            name="total_marks"
            value={updatedInformation.total_marks}
            label="Total Marks"
            variant="outlined"
            fullWidth
            onChange={handleChange2}
          />
          <Button variant="contained" color="primary" onClick={() => { handleSubmit("UPDATE_EXAM") }}>
            Update Exam
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default Exam;
