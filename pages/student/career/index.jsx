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

    const handleButtonClick = () => {
        setOpenform(!openform);
    };

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
        </Box>
    );
}

export default StudentCareer
