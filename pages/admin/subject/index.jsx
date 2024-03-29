import {
    Grid,
    Button,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    Modal,
    TextField,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    TableContainer,
    TablePagination,
    InputAdornment,
    IconButton,
    Paper,
    Fab,
  } from "@mui/material";
  import FeatherIcon from "feather-icons-react";
  import React, { useState, useEffect } from "react";
  import Link from "next/link";
  import Cookies from "js-cookie";
  import axios from "axios";
  import { useSelector } from "react-redux";
  import { getOrdinals } from "../../../src/Helper/functions";
  import Swal from "sweetalert2";
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
  
  function subjectIndex() {
    const data = useSelector((store) => store.user);
    const [currSub, setcurrSub] = useState("");
    const [open1, setopen1] = useState(false);
    const [allSubjects, setallSubjects] = useState([]);
    const [allTeachers, setallTeachers] = useState([]);
    const [teacherId, setteacherId] = useState("");
    const [loading, setloading] = useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [filterText, setFilterText] = useState("");
  
    const btnData = (
      <Link
        style={{ color: "inherit", textDecoration: "none" }}
        href="/subject/addSubject"
      >
        <Button variant="contained" sx={{ ml: "auto" }}>
          Add Subject
        </Button>
      </Link>
    );
    const handleFilterTextChange = (event) => {
      setFilterText(event.target.value);
    };
  
    const filteredData = allSubjects.filter((row) =>
      [row.name].some((value) =>
        value.toLowerCase().includes(filterText.toLowerCase())
      )
    );
    const displayedData = filteredData.slice(
      currentPage * rowsPerPage,
      currentPage * rowsPerPage + rowsPerPage
    );
  
    const handleChangePage = (event, newPage) => {
      setCurrentPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setCurrentPage(0);
    };
  
    const updateSubject = async () => {
      setloading(true);
      const token = Cookies.get("access_key");
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}update_subject_teacher`,
        {
          teacher_id: teacherId,
          subject_id: currSub,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.data.status == 1) {
        setloading(false);
        setopen1(false);
        Swal.fire({
          position: "top",
          icon: "success",
          title: `${res.data.data.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
        const getALLSubjects = async () => {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}get_all_subject`,
            null,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const allSubjects = res.data.data.subjects.map((elm, idx) => {
            return elm;
          });
          console.log(allSubjects, "sub");
          setallSubjects(allSubjects);
        };
        getALLSubjects();
      } else {
        setloading(false);
        Swal.fire({
          position: "top",
          icon: "warning",
          title: `${res.data.data.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    };
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
        const allSubjects = res.data.data.subjects.map((elm, idx) => {
          return elm;
        });
        console.log(allSubjects, "sub");
        setallSubjects(allSubjects);
      };
  
      const getALLTeacher = async () => {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}get_all_teacher`,
          null,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const allTeachers = res.data.data.teachers.map((elm, idx) => {
          return elm;
        });
        console.log(allTeachers, "tchr");
        setallTeachers(allTeachers);
      };
      getALLTeacher();
      getALLSubjects();
    }, []);
  
    const handleModal1 = (subId) => {
      setcurrSub(subId);
      setopen1(true);
    };
    const handleModal1Close1 = () => setopen1(false);
  
    const assignTeacher = async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}update_subject_teacher`,
        {}
      );
    };
  
    return (
      <>
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
              Subject List
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
  
            <Link
              style={{ color: "inherit", textDecoration: "none" }}
              href="/admin/subject/addSubject"
            >
              {/* <Button
                variant="contained"
              >
                Add Subject
              </Button> */}
              <Fab variant="extended" size="small" color="primary" sx={{ p: 2 }}>
                Add Subject
              </Fab>
            </Link>
          </Box>
  
          <TableContainer
            sx={{ overflowX: "auto", p: 1 }}
            className="table_scroll"
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
                  <TableCell>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "15px",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      Sl. no.
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
                      Department
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
                      Year
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
                      Semester
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
                      Assigned Teacher
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
                      Updated at
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
                      Assign Teacher
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedData.map((item, idx) => (
                  <TableRow key={item.id}>
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
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography
                            sx={{
                              fontSize: "13px",
                            }}
                          >
                            {item.name}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography
                            sx={{
                              fontSize: "13px",
                            }}
                          >
                            {item.course_name}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography
                            sx={{
                              fontSize: "13px",
                            }}
                          >
                            {item.department_name}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography
                            sx={{
                              fontSize: "13px",
                            }}
                          >
                            {getOrdinals(item.year)}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography
                            sx={{
                              fontSize: "13px",
                            }}
                          >
                            {getOrdinals(item.semester)}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
  
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography
                            sx={{
                              fontSize: "13px",
                            }}
                          >
                            {item.assigned_teacher == null
                              ? "N/A"
                              : item.teacher_name}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography
                            sx={{
                              fontSize: "13px",
                            }}
                          >
                            {new Date(item.updated_at).toLocaleString()}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          {/* <Button
                            onClick={() => {
                              handleModal1(item.id);
                            }}
                            variant="contained"
                            color="success"
                            size="small"
                          >
                            Assign Teacher
                          </Button> */}
                          <Fab
                            variant="extended"
                            size="small"
                            color="success"
                            sx={{ p: 2 }}
                            onClick={() => {
                              handleModal1(item.id);
                            }}
                          >
                            Assign Teacher
                          </Fab>
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={displayedData.length}
            rowsPerPage={rowsPerPage}
            page={currentPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
  
          <Modal
            open={open1}
            onClose={handleModal1Close1}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} gap={5} display="flex" flexDirection="column">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Assign Teacher to subject
              </Typography>
  
              <Box
                sx={{ minWidth: 120 }}
                display="flex"
                flexDirection="column"
                gap={5}
              >
                <TextField
                  value={currSub}
                  id="outlined-basic"
                  variant="outlined"
                  label="teacher Id"
                  disabled
                />
                <FormControl fullWidth>
                  <InputLabel>Please select teacher</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={teacherId}
                    onChange={(e) => {
                      setteacherId(e.target.value);
                    }}
                    defaultValue="fksdnkn"
                  >
                    <MenuItem value="">None</MenuItem>
  
                    {allTeachers.length > 0 &&
                      allTeachers.map((elm, idx) => {
                        return (
                          <MenuItem key={idx} value={elm.teacher_id}>
                            {elm.first_name + " " + elm.last_name}
                          </MenuItem>
                        );
                      })}
                  </Select>
  
                  <Button
                    onClick={updateSubject}
                    type="submit"
                    variant="contained"
                    sx={{ marginTop: "25px" }}
                    disabled={teacherId == null || teacherId == ""}
                  >
                    {loading ? "Updating..." : "Update"}
                  </Button>
                </FormControl>
              </Box>
            </Box>
          </Modal>
        </Box>
      </>
    );
  }
  
  export default subjectIndex;
  