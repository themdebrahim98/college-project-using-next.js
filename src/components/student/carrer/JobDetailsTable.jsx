
import React, { useState } from 'react';
import { Box, Button, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { Add, Edit, ExpandMore, Save } from '@mui/icons-material';
function JobDetailsTable(props) {
    return (
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
                                    textAlign:'center'
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
                                    textAlign:'center'
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
                                    textAlign:'center'
                                }}
                            >
                                Action
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.tableData != "" ? props.tableData.map((item, idx) => (
                        <TableRow key={idx}>
                            <TableCell>
                                {item.company_name}
                            </TableCell>
                            <TableCell>
                                {item.company_loctaion}
                            </TableCell>
                            <TableCell>
                                {item.designation}
                            </TableCell>
                            <TableCell sx={{textAlign:'center'}}>
                                {item.offer_letter==null?<Button variant='contained' size='small' color='warning'>Upload OL</Button>:""}
                            </TableCell>
                            <TableCell sx={{textAlign:'center'}}>
                                {item.joining_letter==null?<Button variant='contained' size='small' color='warning'>Upload JL</Button>:""}
                            </TableCell>
                            <TableCell sx={{textAlign:'center'}}>
                                <IconButton ><Edit/></IconButton>
                            </TableCell>
                        </TableRow>
                    )) : ""}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default JobDetailsTable
