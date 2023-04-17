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
    Drawer,
    Stack,
    Paper,
    TableContainer,
    FormControl,
    Select,
    MenuItem,
    TablePagination,
    InputAdornment,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
    InputLabel,
    Autocomplete,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { Edit, PublishRounded, Settings, SwapVerticalCircle } from "@mui/icons-material";
function Courses() {
    const [allCourses, setallCourses] = useState([]);
    const [allSessions, setallSessions] = useState([]);
    const [open, setOpen] = React.useState(false);

    const handleChange = (event, value) => {
        console.log(value?.id);
    };
    const handleUpdateSessionClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        const fetchALlCourse = async () => {
            const res2 = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}get_courses`,
                null
            );
            setallCourses([...res2.data.data.courses]);
        };

        const token = Cookies.get("access_key");

        const fetchAllSession = async () => {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}get_all_session`,
                null,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const allSession = res.data.data.sessions.map((elm, idx) => {
                return ({ ...elm, checked: false })
            });
            setallSessions(allSession)
        };
        fetchALlCourse();
        fetchAllSession();
    }, []);
    return (
        <>
            <TableContainer
                style={{ overflowX: "auto" }}
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
                                    Current Session
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
                                    Updated At
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
                    </TableHead>{" "}
                    <TableBody>
                        {console.log(allSessions)}
                        {allCourses.length > 0 &&
                            allCourses.map((elm, idx) => {
                                return (
                                    <TableRow key={idx}>
                                        <TableCell>
                                            <Typography
                                                sx={{
                                                    fontSize: "15px",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                {elm.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                sx={{
                                                    fontSize: "15px",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                {elm.description}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                sx={{
                                                    fontSize: "15px",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                {elm.session_name + " "}<IconButton color="warning" title="update session" onClick={handleUpdateSessionClick}><PublishRounded /></IconButton>
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                sx={{
                                                    fontSize: "15px",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                {elm.updated_at}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                sx={{
                                                    fontSize: "15px",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                <IconButton color="info" title="Edit"><Edit /></IconButton>
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
                {/* <TablePagination
            rowsPerPageOptions={[5, 10, 20, 40]}
            component="div"
            count={allCourses.length}
            rowsPerPage={rowsPerPage}
            page={currentPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
            </TableContainer>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ fontWeight: 'bold' }}>Upgrade from current session</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: 2 }}>
                        By ugrading from current session all the process releated with that changed please do it carefully..!
                    </DialogContentText>
                    {/* <FormControl fullWidth >
                        <InputLabel id="demo-simple-select-label">Select session</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Select session"
                        >
                            {allSessions.length > 0 &&
                                allSessions.map((elm, idx) => {
                                    return (
                                        <MenuItem key={idx} value={elm.id}>{elm.name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl> */}
                    <Autocomplete
                        options={allSessions}
                        getOptionLabel={(option) => option.name}
                        onChange={handleChange}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Movie" />}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button >Update</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Courses
