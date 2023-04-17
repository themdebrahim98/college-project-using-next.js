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
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
function Departments() {
    return (
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
                    Sl. No.
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

            </TableBody>
          </Table>
          {/* <TablePagination
            rowsPerPageOptions={[5, 10, 20, 40]}
            component="div"
            count={teacherDatas.length}
            rowsPerPage={rowsPerPage}
            page={currentPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
        </TableContainer>
    )
}

export default Departments
