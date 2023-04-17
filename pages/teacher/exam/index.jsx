import React, { useState, useEffect, useRef } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
    Box, Button, Drawer, Fab, 
    IconButton, 
    InputAdornment, 
    TextField, 
    Typography,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
} from '@mui/material';
import Link from 'next/link';
import { BookmarkAdd, Close, RemoveRedEyeRounded } from '@mui/icons-material';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

function exam() {
    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];

    const [draweropenState, setDraweropenState] = useState(false);
    const closePannel = (e) => {
        setDraweropenState(false);
    };

    const handleAddExamDrawer = () => {
        setDraweropenState(true);
    }

    return (
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
                    Exam List
                </Typography>
                <Fab variant="extended" size="small" color="primary" sx={{ p: 2 }}
                    onClick={handleAddExamDrawer}>
                    Add Exam
                </Fab>
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
                                    Subject Name
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
                                    Exam date
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
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell>{row.calories}</TableCell>
                                <TableCell>{row.calories}</TableCell>
                                <TableCell>{row.fat}</TableCell>
                                <TableCell>{row.carbs}</TableCell>
                                <TableCell>
                                    <Link href='exam/giveMarks'>
                                        <Fab variant="extended" size="small" color="success" title='give marks'>
                                            <BookmarkAdd />
                                        </Fab>
                                    </Link>
                                    <Link href='exam/examDetails'>
                                        <Fab variant="extended" sx={{ m: 1 }} size="small" color="primary" title='Exam Details'>
                                            <RemoveRedEyeRounded />
                                        </Fab>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Drawer
                PaperProps={{
                    sx: {
                        width: { lg: "30%", md: "20%", xs: "100%" },
                        padding: "15px",
                    },
                }}
                anchor="right"
                open={draweropenState}
                onClose={closePannel}
                sx={{ zIndex: "10000" }}
            >
                <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                    justifyContent="center"
                    px={{ lg: 2, md: 2, sm: 0 }}
                    py={2}
                    gap={2}
                >
                    <Button
                        onClick={closePannel}
                        variant="contained"
                        color="danger"
                        sx={{ color: '#fff', mt: 2, mb: 2 }}
                        startIcon={<Close />}
                    >
                        Close
                    </Button>
                    <FormControl fullWidth>
                        <InputLabel id="select_subject">Select Subject</InputLabel>
                        <Select
                            labelId="subject_label"
                            id="select_subject"
                            value="10"
                            label="Select Subject"
                        // onChange={handleSubjectChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField id="name" type="text" name="name" label="Name" variant="outlined" fullWidth autoComplete="off" />
                    <TextField id="description" type="text" name="description" label="Description" variant="outlined" fullWidth />
                    <TextField id="date" type="date" defaultValue={new Date().toISOString().substring(0, 10)} name="date" label="Date" variant="outlined" fullWidth InputLabelProps={{
                        shrink: true,
                    }} />
                    <TextField id="total_marks" type="number" name="total_marks" label="Total Marks" variant="outlined" fullWidth />
                    <Button variant="contained" color="primary">Create Exam</Button>
                </Box>

            </Drawer>
        </Box>
    );
}

export default exam;