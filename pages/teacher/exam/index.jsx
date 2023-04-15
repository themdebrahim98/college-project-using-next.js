import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Fab, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import { BookmarkAdd, RemoveRedEyeRounded } from '@mui/icons-material';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function exam() {
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
                <Fab variant="extended" size="small" color="primary" sx={{ p: 2 }}>
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
        </Box>
    );
}