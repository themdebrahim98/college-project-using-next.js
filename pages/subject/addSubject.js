import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Grid,
  Button,
  Select,
  MenuItem,
  Stack,
  Paper,
  Typography,
  Container,
  Alert,
  Snackbar
} from "@mui/material";
import React, { useState, useEffect } from "react";
import BaseCard from "../../src/components/baseCard/BaseCard";
import Link from "next/link";
import Cookies from "js-cookie";
import axios from "axios";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/dist/client/router";

const vertical = "top",
horizontal = "right";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  // textAlign: "center",
  color: theme.palette.text.secondary,
}));

function addSubject() {
  const [allDepertments, setallDepertments] = useState([]);
  const [allCourses, setallCourses] = useState([]);
  const [alertMsg, setAlertMsg] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const [subjectDetails, setsubjectDetails] = useState({
    name: "",
    course_id: "",
    department_id: "",
    semester: "",
    year: "",
    assigned_teacher: "",
    status: "",
  });

  const handleInput = (e) => {
    setsubjectDetails((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  useEffect(() => {
    const fetchAllDepertment = async () => {
      const res2 = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}get_departments`, null);
      setallDepertments([...res2.data.data.departments]);
    };

    const fetchALlCourse = async () => {
      const res2 = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}get_courses`, null);
      setallCourses([...res2.data.data.courses]);
    };
    fetchAllDepertment();
    fetchALlCourse();
  }, []);

  const handleCreateSubject = async () => {
    setLoading(true);
    if (!subjectDetails.course_id) {
      setOpenAlert(true);
      setAlertMsg("Please select course");
    } else if (!subjectDetails.department_id) {
      setOpenAlert(true);
      setAlertMsg("Please select department");
    } else if (!subjectDetails.semester) {
      setOpenAlert(true);
      setAlertMsg("please select semester");
    } else if (!subjectDetails.year) {
      setOpenAlert(true);
      setAlertMsg("please select year");
    }
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}add_subject`,subjectDetails,{
      headers:{Authorization:`Bearer ${Cookies.get("access_key")}`}
    });
    setLoading(false)
    router.back()
    
  };
  return (
    <>
      <Container sx={{ mt: 2 }}>
        <Alert
          severity="success"
          sx={{
            display: "none",
            fontWeight: "medium",
            fontSize: "h4.fontSize",
          }}
        >
          {alertMsg}
        </Alert>
      </Container>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
        open={openAlert}
        autoHideDuration={2000}
        onClose={handleAlertClose}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {alertMsg}
        </Alert>
      </Snackbar>

      <Item>
        <Grid container p={1} spacing={2}>
          <Grid item xs={12} lg={12} sx={{ mb: 2 }} textAlign="start">
            <Typography variant="h3" textAlign="start" color="">
              <b>Add subject</b>
            </Typography>
          </Grid>
          {/*  */}
          <Grid item xs={12} lg={6} sx={{ mb: 2 }} textAlign="start">
            <TextField
              id="Name"
              label="Name"
              name="name"
              value={subjectDetails.name}
              variant="outlined"
              onChange={handleInput}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <FormControl fullWidth>
              <InputLabel id="gender">Select Course</InputLabel>
              <Select
                labelId="course"
                id="gender-select"
                label="Gender"
                name="course_id"
                onChange={handleInput}
                value={subjectDetails.course_id}
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
          </Grid>
          <Grid item xs={12} lg={6}>
            <FormControl fullWidth>
              <InputLabel id="gender">Select Department</InputLabel>
              <Select
                labelId="department"
                id="selectDepartment"
                label="depatment"
                name="department_id"
                onChange={handleInput}
                value={subjectDetails.department_id}
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
          </Grid>
          <Grid item xs={12} lg={6} sx={{ mb: 2 }} textAlign="start">
            <FormControl fullWidth>
              <InputLabel id="gender">Select Year</InputLabel>
              <Select
                labelId="year"
                id="selectYear"
                label="year"
                name="year"
                onChange={handleInput}
                value={subjectDetails.year}
              >
                <MenuItem value={1}>1st</MenuItem>
                <MenuItem value={2}>2nd</MenuItem>
                <MenuItem value={3}>3rd</MenuItem>
                <MenuItem value={4}>4th</MenuItem>
                <MenuItem value={5}>5th</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={6} sx={{ mb: 2 }} textAlign="start">
            <FormControl fullWidth>
              <InputLabel id="gender">Select Semester</InputLabel>
              <Select
                labelId="year"
                id="selectYear"
                label="year"
                name="semester"
                onChange={handleInput}
                value={subjectDetails.semester}
              >
                <MenuItem value={1}>1st Sem</MenuItem>
                <MenuItem value={2}>2nd Sem</MenuItem>
                <MenuItem value={3}>3rd Sem</MenuItem>
                <MenuItem value={4}>4th Sem</MenuItem>
                <MenuItem value={5}>5th Sem</MenuItem>
                <MenuItem value={6}>6th Sem</MenuItem>
                <MenuItem value={7}>7th Sem</MenuItem>
                <MenuItem value={8}>8th Sem</MenuItem>
                <MenuItem value={9}>9th Sem</MenuItem>
                <MenuItem value={10}>10th Sem</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/*  */}
        </Grid>
        <Button
          sx={{ bgcolor: "primary" }}
          variant="contained"
          onClick={handleCreateSubject}
          disabled={loading}
        >
          {loading?"Creating Subject":" Create Subject"}
         
        </Button>
      </Item>
    </>
  );
}

export default addSubject;
