import React, { useState, useEffect } from "react";
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
  TableContainer,
  Paper,
  Modal,
  TextField,
  InputAdornment,
  IconButton,
  Pagination,
  TablePagination,
  Fab,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import axios from "axios";
import { useSelect } from "@mui/base";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import Snackbar from "@mui/material/Snackbar";
import FeatherIcon from "feather-icons-react";
import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated";
import MuiAlert from "@mui/material/Alert";
import { CloudDownload, FileDownload, FileUpload, UploadFile } from "@mui/icons-material";
import TeacherRoutine from '../user/Components/routine'
import { getOrdinals } from "../../src/Helper/functions";

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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Routine() {
  const vertical = "top",
    horizontal = "center";
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [allRoutine, setAllRoutine] = useState([]);
  const [open1, setopen1] = useState(false);
  const user = useSelector((store) => store.user);
  const [currSubjectDetails, setcurrSubjectDetails] = useState({});
  const [uploading, setUploading] = useState(false);
  const [file, setfile] = useState(null);
  const [inputsOfRoutin, setInputOfRoitine] = useState({
    year: "",
    semester: "",
  });
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [filterText, setFilterText] = useState("");
  const [open2, setopen2] = useState("");
  const [currRoutineToBeUpdate, setcurrRoutineToBeUpdate] = useState("");

  const actions = [
    {
      icon: <BrowserUpdatedIcon />,
      name: "Update",
      onclick: (props) => {
        setopen2(true);
        setcurrRoutineToBeUpdate(props.id);
      },
    },
    {
      icon: <CloudDownload />,
      name: "Save",
      onclick: (props) => {
        window.open(props.routine_url, "_blank");
      },
    },
  ];

  const handleModa2Close = () => setopen2(false);

  const data = useSelector(
    (store) => store.user.userData.user_data?.hod_data[0]
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

  const filteredData = allRoutine.filter((row) =>
    [row.course_name].some((value) =>
      value.toLowerCase().includes(filterText.toLowerCase())
    )
  );

  const displayedData = filteredData.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const openModal1 = (subject_id, subject_name) => {
    setcurrSubjectDetails({ subject_id, subject_name });
    setopen1(true);
  };
  const handleModal1Close1 = () => setopen1(false);

  const selectFile = (e) => {
    const file = e.target.files[0];
    setfile(file);
  };

  const updateRoutine = async () => {
    if (file != null) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}update_routine`,
        {
          routine_id: currRoutineToBeUpdate,
          attachment: file,
        },
        { headers: { Authorization: `Bearer ${Cookies.get("access_key")}`, "Content-Type": "multipart/form-data", } }
      );
      console.log(res);
    }
  };

  const handleFileUpload = async () => {
    console.log(inputsOfRoutin);

    if (file != null) {
      try {
        setUploading(true);
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}add_routine`,
          {
            course_id: data.course_id,
            department_id: data.department_id,
            year: inputsOfRoutin.year,
            semester: inputsOfRoutin.semester,
            attachment: file,
          },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("access_key")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (res.data.data.status == 1) {
          setAlertSeverity("success");
          setUploading(false);
          setopen1(false);
          setOpenAlert(true);
          setAlertMsg(res.data.data.message);
          setfile(null);
        } else {
          setAlertSeverity("error");
          setUploading(false);
          setopen1(true);
          setOpenAlert(true);
          setAlertMsg(res.data.data.message);
        }
      } catch (err) {
        setAlertSeverity("error");
        setOpenAlert(true);
        setUploading(false);
        setAlertMsg("Can't uploaded a file");
      }
    } else {
      setAlertSeverity("warning");
      setOpenAlert(true);
      setAlertMsg("Please select a file");
    }
  };

  useEffect(() => {
    const getAllRoutines = async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}get_all_routine`,
        { teacher_id: user.userData.user_data.teacher_id },
        { headers: { Authorization: `Bearer ${Cookies.get("access_key")}` } }
      );
      setAllRoutine(res.data.data.routine);
      console.log(res.data);
    };
    getAllRoutines();
  }, [open1]);

  const handleInput = (e) => {
    e.preventDefault();
    setInputOfRoitine((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
    {user.userData.user_data?.is_hod==1?
    <>
    {/* {console.log(user.userData.user_data.is_hod)} */}
      <Modal
        open={open2}
        onClose={handleModa2Close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} gap={5} display="flex" flexDirection="column">
          <Box
            sx={{ minWidth: 120 }}
            display="flex"
            flexDirection="column"
            gap={5}
            component="form"
            encType="multipart/form-data"
            onChange={selectFile}
          >
            <TextField
              inputProps={{ accept: ".pdf,.doc,.docx" }}
              type="file"
              name="file"
              id="outlined-basic"
              variant="outlined"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={updateRoutine}
              disabled={uploading ? true : false}
              startIcon={<FileUpload />}
            >
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </Box>
        </Box>
      </Modal>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
        open={openAlert}
        autoHideDuration={2000}
        onClose={handleAlertClose}
      >
        <Alert severity={alertSeverity} sx={{ width: "100%" }}>
          {alertMsg}
        </Alert>
      </Snackbar>
      <Modal
        open={open1}
        onClose={handleModal1Close1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} gap={5} display="flex" flexDirection="column">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Upload Routine
          </Typography>
          <TextField
            value={data.course_name}
            disabled
            label="course"
            inputProps={{ accept: ".pdf,.doc,.docx" }}
            name="course"
            id="outlined-basic"
            variant="outlined"
          />

          <TextField
            value={data.department_name}
            disabled
            label="department"
            inputProps={{ accept: ".pdf,.doc,.docx" }}
            name="department"
            id="outlined-basic"
            variant="outlined"
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Year</InputLabel>
            <Select
              name="year"
              value={inputsOfRoutin.year}
              onChange={handleInput}
              labelId="demo-simple-select-label"
            >
              <MenuItem value={1}>1st year</MenuItem>
              <MenuItem value={2}>2nd year</MenuItem>
              <MenuItem value={3}>3rd year</MenuItem>
              <MenuItem value={4}>4th year</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Semester</InputLabel>
            <Select
              name="semester"
              value={inputsOfRoutin.semester}
              onChange={handleInput}
              labelId="demo-simple-select-label"
            >
              <MenuItem value={1}>1st semester</MenuItem>
              <MenuItem value={2}>2nd semester</MenuItem>
              <MenuItem value={3}>3rd semester</MenuItem>
              <MenuItem value={4}>4th semester</MenuItem>
              <MenuItem value={5}>5th semester</MenuItem>
              <MenuItem value={6}>6th semester</MenuItem>
              <MenuItem value={7}>7th semester</MenuItem>
              <MenuItem value={8}>8th semester</MenuItem>
            </Select>
          </FormControl>

          <Box
            sx={{ minWidth: 120 }}
            display="flex"
            flexDirection="column"
            gap={5}
            component="form"
            encType="multipart/form-data"
            onChange={selectFile}
          >
            <TextField
              inputProps={{ accept: ".pdf,.doc,.docx" }}
              type="file"
              name="file"
              id="outlined-basic"
              variant="outlined"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleFileUpload}
              disabled={uploading ? true : false}
              startIcon={<FileUpload />}
            >
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </Box>
        </Box>
      </Modal>

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
            List of routine
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
          {/* <Button size="medium" variant="contained" onClick={openModal1}>
            Add Routine
          </Button> */}
          <Fab variant="extended" size="small" color="primary" onClick={openModal1}>
            Add Routine
          </Fab>
        </Box>
        <TableContainer
          component={Paper}
          style={{ overflowX: "auto" }}
          className="table_scroll"
          sx={{ p: 1 }}
        >
          <Table
            sx={{
              whiteSpace: "nowrap",
            }}
            size="small"
          >
            <TableHead sx={{ background: '#03c9d7' }}>
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
                    Course Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "15px", color: "black", fontWeight: 'bold' }}
                  >
                    Department Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "15px", color: "black", fontWeight: 'bold' }}
                  >
                    Year
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "15px", color: "black", fontWeight: 'bold' }}
                  >
                    Semester
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "15px", color: "black", fontWeight: 'bold' }}
                  >
                    Update on
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "15px", color: "black", fontWeight: 'bold' }}
                  >
                    Action
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>{" "}
            <TableBody>
              {displayedData.length > 0 &&
                displayedData.map((routine, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6">
                        {idx + 1}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6">
                        {routine.course_name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6">
                        {routine.department_name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6">
                        {getOrdinals(routine.year)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6">
                        {getOrdinals(routine.semester)}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography color="textSecondary" variant="h6">
                        {new Date(routine.updated_at).toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <SpeedDial
                        direction="right"
                        ariaLabel="Action Btn"
                        icon={<SpeedDialIcon />}

                      >
                        {actions.map((action) => (
                          <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={() => action?.onclick(routine)}
                          />
                        ))}
                      </SpeedDial>

                    </TableCell>

                    {/* <TableCell>
                      <Typography color="textSecondary" variant="h6">
                        <a
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                          }}
                          target="_blank"
                          download
                          href={`${routine?.routine_url}`}
                        >
                    
                          <Fab
                            color="success"
                            size="small"
                            title="Download Syllabus"
                          >
                            <FileDownload />
                           
                          </Fab>
                        </a>
                      </Typography>
                    </TableCell> */}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20, 40]}
            component="div"
            count={displayedData.length}
            rowsPerPage={rowsPerPage}
            page={currentPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
    </>
    :<TeacherRoutine/>}
    </>
  );
}
