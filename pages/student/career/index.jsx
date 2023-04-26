
import React, { useState } from 'react';
import { Box, Button, Collapse, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { Add, ExpandMore, Save } from '@mui/icons-material';

function StudentCareer() {
    const [openform, setOpenform] = useState(false);

    const handleButtonClick = () => {
        setOpenform(!openform);
    };

    return (
        <Box component={Paper}>
            <Box
                display="flex"
                alignItems="center"
                flexDirection="row"
                justifyContent={{ md: "end", xs: "center" }}
                gap={1}
                px={1}
                py={1}
                sx={{ mb: 2, flexWrap: "wrap" }}
            >
                <Button onClick={handleButtonClick} variant='contained' color='warning' startIcon={<Add />}>
                    <Typography variant="h6" component="span">
                        Add Job
                    </Typography>
                </Button>
            </Box>

            <Collapse in={openform}>
                <Box display="flex"
                    alignItems="center"
                    flexDirection={{ md: "row", xs: "column" }}
                    justifyContent="center"
                    gap={1}
                    px={1}
                    py={1}
                    sx={{ mb: 2, flexWrap: "wrap" }}>
                    <TextField
                        variant="outlined"
                        required
                        id="company_name"
                        label="Company Name"
                        name="company_name"
                        autoComplete="off"
                        size='small'
                    />
                    <TextField
                        variant="outlined"
                        required
                        id="company_location"
                        label="Company Location"
                        name="company_location"
                        autoComplete="off"
                        size='small'
                    />
                    <TextField
                        variant="outlined"
                        required
                        id="designation"
                        label="Designation"
                        name="designation"
                        size='small'
                        autoComplete="off"
                    />
                    <Button type='submit' variant='contained' size='medium' color='success' startIcon={<Save />}>Save</Button>
                </Box>
            </Collapse>

            <TableContainer sx={{ overflowX: "auto", p: 1 }} className="table_scroll">
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
                                    Company Name
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
                                    Company Location
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
                                    Designation
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
                                    Offer Letter
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
                                    Joining Letter
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
                        <TableRow>
                            <TableCell component="th" scope="row" colSpan={6} align="center">
                                    No data
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default StudentCareer
