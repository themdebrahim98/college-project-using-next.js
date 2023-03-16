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
export default function index() {
  const [allSubjectOfTeacher, setallSubjectOfTeacher] = useState([]);
  const [open1, setopen1] = useState(false);
  const user = useSelector((store) => store.user);
  const [currSubjectDetails, setcurrSubjectDetails] = useState({})
  const [file, setfile] = useState(null)

  const openModal1 = (subject_id, subject_name) => {
    console.log(subject_name)
    setcurrSubjectDetails({subject_id, subject_name})
    setopen1(true);
  };
  const handleModal1Close1 = () => setopen1(false);

  const selectFile = (e) => {
    const file = e.target.files[0];
    console.log(file)
    setfile(file);
    
    
  };

  const handleFileUpload = async()=>{
    const form_data = new FormData();
    form_data.append("test.pdf", file);
    console.log(form_data,'formdata');
    console.log(file,"file")

    // console.log(currSubjectDetails)
    // const res = await axios.post(`${BASE_URL}update_subject_syllabus`,{
    //     ...currSubjectDetails,
    //     upload_file: form_data
    // },
    // {headers:{Authorization:`Bearer ${Cookies.get('access_key')}`}})
    // alert("Successfully uploaded file")
  }

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
  }, []);

  return (
    <>
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
          >
            <TextField
              onChange={selectFile}
              type="file"
              id="outlined-basic"
              variant="outlined"
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleFileUpload}
            >
              Upload
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
                    Id
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
                <TableCell>
                  <Typography
                    sx={{ fontSize: "15px", color: "black" }}
                    variant="h6"
                  >
                    Date
                  </Typography>
                </TableCell>
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
              {allSubjectOfTeacher.map((subject, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {subject.id}
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
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {subject.updated_at}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {subject.syllabus.attachment_id == null ? (
                        <Button
                          onClick={()=>{openModal1(subject.id, subject.name)}}
                          color="secondary"
                          variant="contained"
                        >
                          Upload Syllabus
                        </Button>
                      ) : (
                        <Button color="secondary" variant="contained">
                          <a download href={`${subject.syllabus.fileData}`}>
                            download
                          </a>
                        </Button>
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
