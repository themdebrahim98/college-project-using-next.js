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
  Checkbox,
  Autocomplete,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import Cookies from "js-cookie";
import axios from "axios";
import { useSelector } from "react-redux";
import { Save } from "@mui/icons-material";

function pendingStudent() {
  const [allApprovedStudents, setallApprovedStudents] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [allSession, setallSession] = React.useState([]);
  const [currSessionID, setcurrSessionID] = React.useState("");
  const [isSellectSessionID, setisSellectSessionID] = React.useState(false);
  const [checkedStudentTobeUpload, setcheckedStudentTobeUpload] = useState([]);
  const [checked, setChecked] = useState([]);
  const [allChecked, setallChecked] = useState(false);

  const handleChange = (e, option) => {
    setcurrSessionID(option?.id);
    setisSellectSessionID(true);
  };

  const data = useSelector(
    (store) => store.user.userData.user_data.hod_data[0]
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
      value?.toLowerCase().includes(filterText.toLowerCase())
    )
  );

  const displayedData = filteredData.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

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
      console.log(sessions, "op");
      // console.log(allSession, "allkjdscnkvn");
      // setteacherDatas(allTeachers);
    };

    console.log(data,"test")
    if (data != undefined) {
      const fetchAllNonAssignStudents = async () => {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}get_all_students`,
            { department_id: data.department_id, course_id: data.course_id },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          const nonSessionAssignStudents = res.data.data.students.filter(
            (elm) => {
              return elm.current_session_id === null;
            }
          );
          console.log(nonSessionAssignStudents);
          setallApprovedStudents(nonSessionAssignStudents);
        } catch (error) {
          console.log(error)
        }
      };
      fetchAllNonAssignStudents();
    }

    getAllSession();
    
  }, []);


  const handleAllChecked = () => {
    if (allChecked == false) {
      const allId = allApprovedStudents.map((elm, idx) => {
        return elm.student_id;
      });
      setChecked(allId);
      setcheckedStudentTobeUpload(allId);
      setallChecked(true);
    } else {
      setChecked([]);
      setallChecked(false);
    }
  };

  const handleCheckboxChange = (event, id) => {
    const newData = allApprovedStudents.map((row) => {
      if (row.student_id === id) {
        const index = checked.indexOf(id);
        if (index == -1) {
          setChecked([...checked, id]);
          setcheckedStudentTobeUpload([...checkedStudentTobeUpload, id]);
          return { ...row, current_session_id: currSessionID };
        } else {
          setChecked(checked.filter((item) => item !== id));
          setcheckedStudentTobeUpload(
            checkedStudentTobeUpload.filter((item) => item !== id)
          );
          return { ...row, current_session_id: null };
        }
      } else {
        return row;
      }
    });
    setallApprovedStudents(newData);
  };

  const handleSave = async () => {
    console.log(checkedStudentTobeUpload);

    const token = Cookies.get("access_key");
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}student_session_registration`,
      { session_id: currSessionID, student_ids: checkedStudentTobeUpload },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };
  return (
    <>
      {console.log(checked, "checked")}
      <Box component={Paper}>
        <Box
          display="flex"
          alignItems="center"
          flexDirection={{ md: "row" }}
          justifyContent={{ md: "space-between" }}
          px={{ lg: 2, md: 2, sm: 0 }}
          gap={2}
          sx={{ mb: 2 }}
        >
          <FormControl fullWidth>
            <Autocomplete
              // loading
              onChange={handleChange}
              id="controllable-states-demo"
              options={allSession}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Controllable" />
              )}
            />
            {/* <Select
              disabled={isSellectSessionID}
              onChange={handleChange}
              value={currSessionID}
              labelId="selectsession"
              id="selectsession"
              label="Sessions"
              name="session"
              sx={{ m: 2 }}
              // onChange={getInput}
              // value={studentDetails.gender}
            >
              {allSession.map((elm, idx) => {
                return <MenuItem value={elm.id}>{elm.name}</MenuItem>;
              })}
            </Select> */}
          </FormControl>
          <Button
            variant="outlined"
            sx={{ mr: 2 }}
            color="success"
            onClick={() => setisSellectSessionID(false)}
          >
            Change
          </Button>
          <FormControl>
            <Button
              variant="contained"
              sx={{ mr: 2 }}
              startIcon={<Save />}
              color="success"
              onClick={handleSave}
            >
              Save
            </Button>
          </FormControl>
        </Box>
      </Box>

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
        {isSellectSessionID && (
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
                    <Checkbox
                      onChange={handleAllChecked}
                      checked={allChecked}
                      color="secondary"
                    />
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
                      sx={{
                        fontSize: "15px",
                        color: "black",
                        fontWeight: "bold",
                      }}
                      variant="h6"
                    >
                      Session
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
                      <Checkbox
                        //   disabled={student.current_session_id != null ? true : false}
                        checked={checked.some((id) => id == student.student_id)}
                        onChange={(event) =>
                          handleCheckboxChange(event, student.student_id)
                        }
                      />
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
        )}
      </Box>
    </>
  );
}

export default pendingStudent;
