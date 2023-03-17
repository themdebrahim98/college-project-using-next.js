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
} from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../../commonVariable";
import { useSelect } from "@mui/base";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import Snackbar from "@mui/material/Snackbar";
import FeatherIcon from "feather-icons-react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "30%",
  bgcolor: "background.paper",
  boxShadow: 20,
  p: 4,
  borderRadius: "5px"
};
import MuiAlert from "@mui/material/Alert";
import { FileDownload, FileUpload, UploadFile } from "@mui/icons-material";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function index() {
  const vertical = "top",
  horizontal = "center";
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertSeverity,setAlertSeverity]=useState('');
  const [allSubjectOfTeacher, setallSubjectOfTeacher] = useState([]);
  const [open1, setopen1] = useState(false);
  const user = useSelector((store) => store.user);
  const [currSubjectDetails, setcurrSubjectDetails] = useState({});
  const [uploading, setUploading] = useState(false);
  const [file, setfile] = useState(null);
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

  const handleFileUpload = async () => {
    if (file != null) {
      try {
        setUploading(true);
        const res = await axios.post(
          `${BASE_URL}update_subject_syllabus`,
          {
            ...currSubjectDetails,
            upload_file: file,
          },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("access_key")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (res.data.data.status == 1) {
          setAlertSeverity('success');
          setUploading(false);
          setopen1(false);
          setOpenAlert(true);
          setAlertMsg(res.data.data.message);
        } else {
          setAlertSeverity('error');
          setUploading(false);
          setopen1(true);
          setOpenAlert(true);
          setAlertMsg(res.data.data.message);
        }
      } catch (err) {
        setAlertSeverity('error');
        setOpenAlert(true);
        setUploading(false);
        setAlertMsg("Can't uploaded a file");
      }
    } else {
      setAlertSeverity('warning');
      setOpenAlert(true);
      setAlertMsg("Please select a file");
    }
  };

  useEffect(() => {
    const getSubjectOfTeacher = async () => {
      const res = await axios.post(
        `${BASE_URL}get_teacher_subject_sylabus`,
        { teacher_id: user.userData.user_data.teacher_id },
        { headers: { Authorization: `Bearer ${Cookies.get("access_key")}` } }
      );
      setallSubjectOfTeacher(res.data.data.subjects);
      console.log(res.data);
    };
    getSubjectOfTeacher();
  }, [open1]);

  return (
    <>
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
            Upload Syllabus
          </Typography>

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
              startIcon={<FileUpload/>}
            >
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </Box>
        </Box>
      </Modal>
      <Box component={Paper}>
        <Box sx={{ padding: "15px", fontWeight: "900" }}>
          <Typography sx={{ fontSize: "25px" }}>
            Subject and Syllabus
          </Typography>
        </Box>
        <TableContainer
          component={Paper}
          style={{ minHeight: "100vh", overflowX: "auto" }}
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
                  <Typography
                    sx={{ fontSize: "15px", color: "black" }}
                    variant="h6"
                  >
                    Sl. No.
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{ fontSize: "15px", color: "black" }}
                    variant="h6"
                  >
                    Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{ fontSize: "15px", color: "black" }}
                    variant="h6"
                  >
                    Course Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{ fontSize: "15px", color: "black" }}
                    variant="h6"
                  >
                    Department Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{ fontSize: "15px", color: "black" }}
                    variant="h6"
                  >
                    Year
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{ fontSize: "15px", color: "black" }}
                    variant="h6"
                  >
                    Semester
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    sx={{ fontSize: "15px", color: "black" }}
                    variant="h6"
                  >
                    Assigned Teacher Name
                  </Typography>
                </TableCell>
                {/* <TableCell>
                  <Typography
                    sx={{ fontSize: "15px", color: "black" }}
                    variant="h6"
                  >
                    Date
                  </Typography>
                </TableCell> */}
                <TableCell>
                  <Typography
                    sx={{ fontSize: "15px", color: "black" }}
                    variant="h6"
                  >
                    Syllabus
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>{" "}
            <TableBody>
              {allSubjectOfTeacher.length > 0 &&
                allSubjectOfTeacher.map((subject, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6">
                        {idx+1}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6">
                        {subject.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6">
                        {subject.course_name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6">
                        {subject.department_name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6">
                        {subject.year}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6">
                        {subject.semester}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography color="textSecondary" variant="h6">
                        {subject.teacher_name}
                      </Typography>
                    </TableCell>
                    {/* <TableCell>
                      <Typography color="textSecondary" variant="h6">
                        {subject.updated_at}
                      </Typography>
                    </TableCell> */}

                    <TableCell>
                      <Typography color="textSecondary" variant="h6">
                        {subject.syllabus.attachment_id == null ? (
                          <Button
                            onClick={() => {
                              openModal1(subject.id, subject.name);
                            }}
                            color="secondary"
                            variant="contained"
                            startIcon={<UploadFile/>}
                          >
                            Upload
                          </Button>
                        ) : (
                          <a
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                          }}
                          target="_blank"
                          download
                          href={`${subject.syllabus?.fileData?.url}`}
                        >
                          <Button color="success" variant="contained" startIcon={<FileDownload/>}>
                              Download
                          </Button>
                          </a>
                        )}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}