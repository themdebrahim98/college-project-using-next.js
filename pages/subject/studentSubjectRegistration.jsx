import React, { useState, useEffect } from "react";
import { getOrdinals } from "../../src/Helper/functions";

import Grid from "@mui/material/Grid";
import axios from "axios";
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
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { Save, Tune, Upgrade } from "@mui/icons-material";
import Swal from "sweetalert2";

function studentSubjectAssign() {
    const [allApprovedStudents, setallApprovedStudents] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [allSession, setallSession] = React.useState([]);
    const [currSessionID, setcurrSessionID] = React.useState("");
    const [isSellectSessionID, setisSellectSessionID] = React.useState(false);
    const [isSellectedSubjectId, setisSellectedSubjectId] = React.useState(false);

    const [checkedStudentTobeUpload, setcheckedStudentTobeUpload] = useState([]);
    const [checked, setChecked] = useState([]);
    const [allChecked, setallChecked] = useState(false);
    const [allSubjects, setallSubjects] = useState([]);
    const [currSubjectId, setcurrSubjectId] = useState("");

    const handleChange = (e) => {
        setcurrSessionID(e.target.value);
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
        setChecked([])
        setcheckedStudentTobeUpload([])
        const token = Cookies.get("access_key");
        if (data != undefined) {
            const fetchAllApprovedStudents = async () => {
                try {
                    const res = await axios.post(
                        `${process.env.NEXT_PUBLIC_BASE_URL}get_all_students_with_subjects`,
                        { department_id: data.department_id, course_id: data.course_id },
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    );



                    const currSessionStudent = res.data.data.students.filter(
                        (elm, idx) => elm.current_session_id == currSessionID
                    );
                    console.log(currSessionStudent, "students");
                    setallApprovedStudents(currSessionStudent);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchAllApprovedStudents();

        }
    }, [currSessionID, currSubjectId]);

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
            console.log(allSubjects);
            setallSubjects(allSubjects);
        };
        const getAllSession = async () => {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}get_all_session`,
                null,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const sessions = res.data.data.sessions;
            setallSession(sessions);
            console.log(sessions, "op");
        };
        getALLSubjects();
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

        try {
            const token = Cookies.get("access_key");
            console.log({
                session_id: currSessionID,
                student_ids: checked,
                currSubject_id: currSubjectId,
            });
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}student_subject_registration`,
                {
                    session_id: currSessionID,
                    student_ids: checked,
                    subject_id: currSubjectId,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (res.data.data.status == 1) {
                if (data != undefined) {

                    const fetchAllApprovedStudents = async () => {
                        try {
                            const res = await axios.post(
                                `${process.env.NEXT_PUBLIC_BASE_URL}get_all_students_with_subjects`,
                                { department_id: data.department_id, course_id: data.course_id },
                                {
                                    headers: { Authorization: `Bearer ${token}` },
                                }
                            );



                            const currSessionStudent = res.data.data.students.filter(
                                (elm, idx) => elm.current_session_id == currSessionID
                            );
                            console.log(currSessionStudent, "students");
                            setallApprovedStudents(currSessionStudent);
                        } catch (error) {
                            console.log(error);
                        }
                    };
                    fetchAllApprovedStudents();
                }
                Swal.fire({
                    icon: "success",
                    title: "Owoo...",
                    text: "Successfully assigned",
                });
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "OOps...",
                    text: "Something went wrong",
                });
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "OOps...",
                text: "Something went wrong",
            });
        }
    };

    return (
        <>
            {console.log(allApprovedStudents, "students")}
            {console.log(currSubjectId, "id")}
            <Box component={Paper}>
                {console.log(checked)}
                <Box
                    display="flex"
                    alignItems="center"
                    flexDirection={{ md: "row", xs: "column" }}
                    justifyContent={{ md: "space-between" }}
                    px={{ lg: 1, md: 1, sm: 0 }}
                    gap={1}
                    sx={{ mb: 2 }}
                >
                    <FormControl fullWidth>
                        <InputLabel sx={{ m: 2 }} size="small">
                            Select Session
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            label="session"
                            value={currSessionID}
                            onChange={handleChange}
                            sx={{ m: 2 }}
                            size="small"
                        >
                            {allSession.map((elm) => (
                                <MenuItem value={elm.id}>{elm.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel sx={{ m: 2 }} size="small">
                            Select Subjects
                        </InputLabel>
                        <Select
                            id="demo-simple-select"
                            value={currSubjectId}
                            label="subject"
                            onChange={(e) => {
                                setisSellectedSubjectId(true)
                                setcurrSubjectId(e.target.value)
                            }}
                            sx={{ m: 2 }}
                            size="small"
                        >
                            {allSubjects.map((elm, idx) => (
                                <MenuItem key={idx} value={elm.id}>
                                    {elm.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        color="warning"
                        startIcon={<Save />}
                        size="medium"
                        variant="contained"
                        onClick={handleSave}
                        sx={{ m: 2, minWidth: "100px" }}
                    >
                        Assign
                    </Button>
                    <Button
                        color="success"
                        startIcon={<Upgrade />}
                        size="medium"
                        variant="contained"
                        // onClick={handleSave}
                        sx={{ m: 2, minWidth: "100px" }}
                    >
                        Update
                    </Button>
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
                {isSellectSessionID && isSellectedSubjectId && ( //have to check in future
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

                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {displayedData.map((student, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell>
                                            {
                                                student.subjects != "" &&
                                                    student.subjects?.some((subject) => {
                                                        return subject.subject_id == currSubjectId;
                                                    }) ? <Checkbox disabled checked={student.subjects.some((subject) => {
                                                        return subject.subject_id == currSubjectId;
                                                    })} /> : <Checkbox
                                                    //   disabled={student.current_session_id != null ? true : false}
                                                    checked={checked.some((id) => id == student.student_id)}
                                                    onChange={(event) =>
                                                        handleCheckboxChange(event, student.student_id)
                                                    }
                                                />



                                            }


                                        </TableCell>
                                        {/* <TableCell>
											<Typography color="textSecondary" variant="h6">
												{idx + 1}
											</Typography>
										</TableCell> */}
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                {student.first_name + " " + student.last_name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                {student.current_session_name}
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
                                                {getOrdinals(student.year)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                {getOrdinals(student.semester)}
                                            </Typography>
                                        </TableCell>
                                        {/* <TableCell>
											<Typography color="textSecondary" variant="h6">
												{student.dob}s
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
										</TableCell> */}
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

export default studentSubjectAssign;
