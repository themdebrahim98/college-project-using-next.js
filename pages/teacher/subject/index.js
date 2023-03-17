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
  TablePagination
} from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../../commonVariable";
import { useSelect } from "@mui/base";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import FeatherIcon from "feather-icons-react";

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
  const [currSubjectDetails, setcurrSubjectDetails] = useState({});
  const [file, setfile] = useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [filterText, setFilterText] = useState("");


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
  
  const filteredData = allSubjectOfTeacher.filter((row) =>
  [row.name].some((value) =>
  value.toLowerCase().includes(filterText.toLowerCase())
  )
  );
  const displayedData = filteredData.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );
  const openModal1 = (subject_id, subject_name) => {
    console.log(subject_name);
    setcurrSubjectDetails({ subject_id, subject_name });
    setopen1(true);
  };
  const handleModal1Close1 = () => setopen1(false);

  const selectFile = (e) => {
    const file = e.target.files[0];
    console.log(e.target.files);
    setfile(file);
  };

  const handleFileUpload = async () => {
    console.log(file);
    try {
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
      alert("Successfully uploaded file");
      setopen1(false);
    } catch (err) {
      alert("not uploaded file");
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
        <TextField
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
              {displayedData.length > 0 &&
                displayedData.map((subject, idx) => (
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
                        {console.log(subject)}
                        {subject.syllabus.attachment_id == null ? (
                          <Button
                            onClick={() => {
                              openModal1(subject.id, subject.name);
                            }}
                            color="secondary"
                            variant="contained"
                          >
                            Upload Syllabus
                          </Button>
                        ) : (
                          <Button color="secondary" variant="contained">
                            {console.log(subject)}
                            <a
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                              target="_blank"
                              download
                              href={`${subject.syllabus?.fileData?.url}`}
                            >
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
        <TablePagination
        rowsPerPageOptions={[5, 10, 20, 40]}
        component="div"
        count={displayedData.length}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </Box>
    </>
  );
}
