import React, { useEffect, useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
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
  Button,
  FormControl,
  Tabs,
  Tab,
  Fab,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FeatherIcon from "feather-icons-react";
import Cookies from "js-cookie";
import axios from "axios";
import { useSelector } from "react-redux";
import NextLink from "next/link";
import { getOrdinals } from "../../../src/Helper/functions";
import { ArrowBack, Block, CleaningServices, RemoveRedEye } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import BasicDetails from "../../../src/components/student/BasicDetails";
import ContactDetails from "../../../src/components/student/ContactDetails";
import JobDetails from "../../../src/components/student/JobDetails";

function studentDetails() {
  const [value, setValue] = React.useState("1");
  const path = window.location.pathname.split("/");
  const id = path[path.length - 1];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [studentDetails, setstudentDetails] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("access_key");
    const fetchStudentDetails = async () => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}get_studentDetails_by_id`,
          { student_id: id },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const allStudents = res.data.data.student.map((elm) => ({
          ...elm,
          dob: new Date(elm.dob).toLocaleDateString(),
        }));
        setstudentDetails(allStudents);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudentDetails();
  }, []);
  return (
    <>
      <Box component={Paper} sx={{ mb: 1 }}>
        <Box
          display="flex"
          alignItems="center"
          flexDirection={{ md: "row", xs: "column" }}
          justifyContent={{ md: "space-between", xs: "center" }}
          p={1}
          gap={2}
        >
          <Button
            variant={"contained"}
            color="primary"
            sx={{ ml: 2 }}
            onClick={() => {
              router.back();
            }}
            startIcon={<ArrowBack />}
          >
            Back
          </Button>
          {/* <Button variant={"outlined"} color="success" sx={{ ml: 2 }}>
            Update Details
          </Button> */}
          <Box>
            <Button variant={"outlined"} color="danger" sx={{ ml: 2 }}>
              Reset Password
            </Button>
            <Button variant={"contained"} color="danger" sx={{ ml: 2, color: '#fff' }} startIcon={<Block />}>
              Block
            </Button>
          </Box>
        </Box>
      </Box>
      <Box component={Paper}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Basic Details" value="1" />
              <Tab label="Contact Details" value="2" />
              <Tab label="Job Details" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <BasicDetails data={studentDetails} />
          </TabPanel>
          <TabPanel value="2">
            <ContactDetails data={studentDetails} />
          </TabPanel>
          <TabPanel value="3">
            <JobDetails student_id={id} />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}
export default studentDetails;




