import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Grid,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { Container } from "@mui/system";
import { useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
// import { commonConstants } from "../../constant/common.constant";
import axios from "axios";
import router from "next/router";
import Swal from 'sweetalert2';
import { getOrdinals, getSemesterByYear } from "../../src/Helper/functions";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const StudentRegister = () => {
  const [isVerifyEmail, setisVerifyEmail] = useState(false);
  const [isSuccsessfullySendEmail, setisSuccsessfullySendEmail] =
    useState(false);
  const [currentOtp, setcurrentOtp] = useState("");

  const [studentDetails, setStudentDetails] = useState({
    student_id: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    email_address: "",
    parent_name:"",
    parent_phone_number:"",
    gender: "",
    dob: "",
    course_id: "",
    department_id: "",
    semester: "",
    year: "",
    roll_number: ""

  });

  const [OtpInput, setOtpInput] = useState("");
  const [allDepertments, setallDepertments] = useState([]);
  const [allCourses, setallCourses] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertVisible, setAlertVisible] = useState("none");
  const [loading, setLoading] = useState(false);
  const [loadingEmailVerify, setLoadingEmailVerify] = useState(false);
  const [allSemesters,setAllSemesters]=useState([]);

  const vertical = "top",
    horizontal = "right";
  const getOtpInput = (e) => {
    setOtpInput(e.target.value);
  };
  const dispatch = useDispatch();
  const getInput = (e) => {
    setStudentDetails((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  const changeYear = (e) => {
    setStudentDetails((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
    console.log(getSemesterByYear(e.target.value));
    setAllSemesters(getSemesterByYear(e.target.value));
  };
  const onSubmitBtnClick = () => {
    if (!studentDetails.first_name) {
      setOpenAlert(true);
      setAlertMsg("Please enter first name");
    } else if (!studentDetails.last_name) {
      setOpenAlert(true);
      setAlertMsg("Please enter last name");
    } else if (!studentDetails.phone_number) {
      setOpenAlert(true);
      setAlertMsg("Please enter phone number");
    } else if (studentDetails.phone_number.length!=10){
      setOpenAlert(true);
      setAlertMsg("Enter correct phone number");
    } else if (!studentDetails.email_address) {
      setOpenAlert(true);
      setAlertMsg("Please enter email address");
    } else if (!studentDetails.parent_name) {
      setOpenAlert(true);
      setAlertMsg("Please enter your parent name");
    } else if (!studentDetails.parent_phone_number) {
      setOpenAlert(true);
      setAlertMsg("Please enter your parent phone number");
    } else if (studentDetails.parent_phone_number.length!=10){
      setOpenAlert(true);
      setAlertMsg("Enter correct parent phone number");
    }else if (!studentDetails.gender) {
      setOpenAlert(true);
      setAlertMsg("Please select gender");
    } else if (!studentDetails.course_id) {
      setOpenAlert(true);
      setAlertMsg("Please select course");
    } else if (!studentDetails.department_id) {
      setOpenAlert(true);
      setAlertMsg("Please select department");
    } else if (!studentDetails.semester) {
      setOpenAlert(true);
      setAlertMsg("Please select semester");
    } else if (!studentDetails.year) {
      setOpenAlert(true);
      setAlertMsg("Please select year");
    } else if (!studentDetails.roll_number) {
      setOpenAlert(true);
      setAlertMsg("Please enter roll number");
    } else if (!studentDetails.student_id) {
      setOpenAlert(true);
      setAlertMsg("Please enter registration number");
    }else if(studentDetails.parent_phone_number == studentDetails.phone_number){
      setOpenAlert(true);
      setAlertMsg("Parent number shouldn't be same as your number");
    }
    else {
      setLoading(true);
      dispatch(
        registerStudent(studentDetails, (data) => {
          setLoading(false);
          if (
            data != "error" &&
            data?.status == 200 &&
            data?.data?.status === 1
          ) {
            Swal.fire({
              icon: 'success',
              title: 'You have successfully submited your details..! Please wait for admin approval',
              showConfirmButton: true,
              confirmButtonText: 'I understand..!'
            }).then((result) => {
              if (result.isConfirmed) {
                router.replace("/login")
              }
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: data?.data?.message,
              showConfirmButton: true,
              confirmButtonText: 'I understand..!'
            })
          }
        })
      );
    }
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };
  const registerStudent = (_payload, callback) => {
    return async () => {
      axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}student_signup`,
        data: _payload,
      })
        .then((response) => {
          if (response?.status == 200) {
            callback(response.data);
          }
        })
        .catch((error) => {
          callback("error");
        });
    };
  };

  const emailVerify = async () => {
    if (
      studentDetails.email_address != "" &&
      studentDetails.first_name != "" &&
      studentDetails.last_name != ""
    ) {
      setLoadingEmailVerify(true);
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}verify_mail`, {
        first_name: studentDetails.first_name,
        last_name: studentDetails.last_name,
        email_address: studentDetails.email_address,
      });
      console.log(res.data, "check");
      if (res.data.data.status.status == 1) {
        setLoadingEmailVerify(false);
        setisSuccsessfullySendEmail(true);
        Swal.fire({
          position: 'top-end',
          text: res.data.data.status?.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })
        // alert(res.data.data.status?.message);
        setcurrentOtp(res.data.data.otp);
      } else {
        Swal.fire({
          position: 'top-end',
          text: res.data.data.status?.message,
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        })
        // alert(res && res.data.data.status?.message);
      }
      console.log(res, "eamil");
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill first name, last name & email',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  };

  const VerifyOtp = () => {

    if (OtpInput.toLocaleLowerCase().includes(currentOtp.toLocaleLowerCase())) {
      setisVerifyEmail(true);
      console.log("verified");
    } else {
      Swal.fire({
        position: 'top-end',
        text: 'invalid OTP',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      })
      console.log(OtpInput, currentOtp);
      console.log("NOT verified");
    }
  };

  useEffect(() => {
    const fetchAllDepertment = async () => {
      const res2 = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}get_departments`,
        null
      );
      setallDepertments([...res2.data.data.departments]);
    };

    const fetchALlCourse = async () => {
      const res2 = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}get_courses`,
        null
      );
      setallCourses([...res2.data.data.courses]);
    };
    fetchAllDepertment();
    fetchALlCourse();
  }, []);
  return (
    <>
      <Container sx={{ mt: 2 }}>
        <Alert
          severity="success"
          sx={{
            display: alertVisible,
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
      <Container sx={{ mt: 5 }}>
        <Box
          sx={{
            textAlign: "center",
            m: 1,
            fontWeight: "medium",
            fontSize: "h2.fontSize",
          }}
        >
          Welcome to makaut.
        </Box>
        <Box
          sx={{
            textAlign: "center",
            mb: 5,
            fontWeight: "medium",
            fontSize: "h6.fontSize",
          }}
        >
          Please fill up your details
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              type="text"
              name="first_name"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              onChange={getInput}
              value={studentDetails.first_name}
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="last_name"
              autoComplete="off"
              onChange={getInput}
              value={studentDetails.last_name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="gender">Gender</InputLabel>
              <Select
                labelId="gender"
                id="gender-select"
                label="Gender"
                name="gender"
                onChange={getInput}
                value={studentDetails.gender}
              >
                <MenuItem value={'male'}>Male</MenuItem>
                <MenuItem value={'female'}>Female</MenuItem>
                <MenuItem value={'others'}>Others</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="dob"
              label="DOB"
              type="date"
              name="dob"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              onChange={getInput}
              value={studentDetails.dob}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="phone_number"
              label="Phone Number"
              name="phone_number"
              autoComplete="off"
              onChange={getInput}
              value={studentDetails.phone_number}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              // disabled={isVerifyEmail}
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email_address"
              autoComplete="off"
              onChange={getInput}
              disabled={isSuccsessfullySendEmail}
              value={studentDetails.email_address}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="parent_name"
              label="Parent name"
              name="parent_name"
              autoComplete="off"
              onChange={getInput}
              value={studentDetails.parent_name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="parent_phone_number"
              label="Parent phone number"
              name="parent_phone_number"
              autoComplete="off"
              onChange={getInput}
              value={studentDetails.parent_phone_number}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="gender">Select Year</InputLabel>
              <Select
                labelId="year"
                id="selectYear"
                label="year"
                name="year"
                onChange={changeYear}
                value={studentDetails.year}
              >
                <MenuItem value={1}>1st</MenuItem>
                <MenuItem value={2}>2nd</MenuItem>
                <MenuItem value={3}>3rd</MenuItem>
                <MenuItem value={4}>4th</MenuItem>
                <MenuItem value={5}>5th</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="semester">Select Semester</InputLabel>
              <Select
                labelId="semester"
                id="selectYear"
                label="semester"
                name="semester"
                onChange={getInput}
                value={studentDetails.semester}
              >
                {allSemesters.length > 0 &&
                  allSemesters.map((elm, idx) => {
                    return (
                      <MenuItem key={idx} value={elm}>
                        {getOrdinals(elm)}
                      </MenuItem>
                    );
                  })}
                
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="gender">Select Course</InputLabel>
              <Select
                labelId="course"
                id="gender-select"
                label="Gender"
                name="course_id"
                onChange={getInput}
                value={studentDetails.course_id}
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
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="gender">Select Department</InputLabel>
              <Select
                labelId="department"
                id="selectDepartment"
                label="depatment"
                name="department_id"
                onChange={getInput}
                value={studentDetails.department_id}
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
          <Grid item xs={12} sm={4}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="RollNumber"
              label="Roll Number"
              name="roll_number"
              autoComplete="off"
              onChange={getInput}
              value={studentDetails.roll_number}

            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="RegNumber"
              label="Reg Number"
              name="student_id"
              autoComplete="off"
              onChange={getInput}
              value={studentDetails.student_id}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            {isSuccsessfullySendEmail ? null : (
              <Button
                onClick={emailVerify}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ p: 2 }}
                disabled={loadingEmailVerify}
              >
                {loadingEmailVerify ? "Sending Eamil" : " Verify your email"}
              </Button>
            )}
          </Grid>
          {isSuccsessfullySendEmail && (
            <>
              {isVerifyEmail ? null : (
                <>
                  <Grid item xs={6} sm={4}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="verify OTP"
                      label="Enter OTP"
                      name="verify OTP"
                      autoComplete="off"
                      onChange={getOtpInput}
                      value={OtpInput}
                      helperText={`Eneter OTP send your ${studentDetails.email_address}`}
                    />
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Button
                      onClick={VerifyOtp}
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      sx={{ p: 2 }}
                    >
                      Verify OTP
                    </Button>
                  </Grid>
                </>
              )}
            </>
          )}
        </Grid>
        {isVerifyEmail && (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 5 }}
            onClick={onSubmitBtnClick}
            disabled={loading ? true : false}
          >
            {loading ? "Registering..." : "Submit"}
          </Button>
        )}

        <Grid
          container
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 2, mx: "auto" }}
        >
          <Grid item>
            {/* <Link to="/login" style={{ color: "blue", textDecoration: "none" }}>
              Already have an account? Sign in
            </Link> */}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default StudentRegister;
