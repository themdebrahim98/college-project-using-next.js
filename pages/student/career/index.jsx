<<<<<<< HEAD

import React, { useEffect, useState } from 'react';
import { Box, Button, Collapse, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { Add, ExpandMore, Save } from '@mui/icons-material';
import axios from 'axios';

function StudentCareer() {
  const [openform, setOpenform] = useState(false);
  const [allCountries, setallCountries] = useState([])
  const [allCities, setallCities] = useState([])
  const [allStates, setallStates] = useState([])
=======
import React, { useState, useEffect } from "react";
import { Box, Button, Collapse, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { Add, ExpandMore, Save } from '@mui/icons-material';
import AddJobCollapse from '../../../src/components/student/carrer/AddJobCollapse';
import JobDetailsTable from '../../../src/components/student/carrer/JobDetailsTable';
import Cookies from "js-cookie";
import axios from "axios";
import { useSelector } from 'react-redux';

function StudentCareer() {
    const data = useSelector((store) => store.user);
    const [jobData, setJobData] = useState([]);
    const [openform, setOpenform] = useState(false);
>>>>>>> 9408bea6dce12837036d79c99b103d04a3f3fd68


<<<<<<< HEAD
  // useEffect(() => {
  //   let config = {
  //     method: 'get',
  //     url: 'https://api.countrystatecity.in/v1/countries',
  //     headers: {
  //       'X-CSCAPI-KEY': 'API_KEY'
  //     }
  //   };
    
  //   const getAllCounties = async ()=>{
  //     const res = await axios(config);
  //     console.log(res.data)
  //   }
  // },[])

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
            id="company_location_country"
            label="Company Location country"
            name="company_location_country"
            autoComplete="off"
            size='small'
          />
          <TextField
            variant="outlined"
            required
            id="company_location_state"
            label="Company Location state"
            name="company_location_state"
            autoComplete="off"
            size='small'
          />
          <TextField
            variant="outlined"
            required
            id="company_location_city"
            label="Company Location city"
            name="company_location_city"
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
=======
    useEffect(() => {
        const token = Cookies.get("access_key");
    
        const fetchNotice = async () => {
          const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}get_job_data_by_student_id`, 
          {student_id:data.userData?.user_data?.student_id}, 
          {
            headers: { Authorization: `Bearer ${token}` },
          });
    
          console.log(res.data);
          const allJobData = res.data.data?.jobData?.map((elm, idx) => {
            return elm;
          });
          setJobData(allJobData);
        };
        fetchNotice();
      }, []);

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

            <AddJobCollapse openform={openform} />

            <JobDetailsTable tableData={jobData}/>
>>>>>>> 9408bea6dce12837036d79c99b103d04a3f3fd68
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
