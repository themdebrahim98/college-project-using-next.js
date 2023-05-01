import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from "react";
import axios from "axios";
import data from "../../../public/data.json";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

function JobDetails(props) {
    const [allJobData, setallJobData] = useState([]);
    const fetchAllJobData = async () => {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}get_job_data_by_student_id`,
          {
            student_id: props?.student_id,
          },
          { headers: { Authorization: `Bearer ${Cookies.get("access_key")}` } }
        );
    
        setallJobData(res.data.data.jobData);
      };
      useEffect(() => {
        fetchAllJobData();
      }, []);
    return (
        <TableContainer sx={{ overflowX: "auto", p: 1 }} className="table_scroll">
            {console.log(allJobData)}
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
                                Source
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
                    </TableRow>
                </TableHead>
                <TableBody>
            {allJobData.length > 0 &&
              allJobData.map((elm) => (
                <TableRow>
                  <TableCell>
                    <Typography>{elm.company_name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{elm.company_loctaion}</Typography>
                  </TableCell>


                  <TableCell>
                    <Typography>{elm.source}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {elm.designation}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {elm.offer_letter == null ? "N/A" : elm.offer_letter}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {elm.joining_letter == null ? "N/A" : elm.joining_letter}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
            </Table>
        </TableContainer>
    )
}

export default JobDetails
