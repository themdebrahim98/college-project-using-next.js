import React, { useState, useEffect } from "react";
import Link from 'next/link'
import {
  Typography,
  Box,
  Chip,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,

} from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import axios from "axios";
import { useSelect } from "@mui/base";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

import Snackbar from "@mui/material/Snackbar";
import FeatherIcon from "feather-icons-react";
import { FileDownload, FileUpload, UploadFile } from "@mui/icons-material";
import { getOrdinals } from "../../../src/Helper/functions";
function Classes() {
  const [allClassess, setallClassess] = useState([]);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  useEffect(() => {
    const getallClassesss = async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}get_all_routine`,
        null,
        { headers: { Authorization: `Bearer ${Cookies.get("access_key")}` } }
      );
      setallClassess(res.data.data.routine); // we have to work on this line api will be replace
      console.log(res.data);
    };
    getallClassesss();
  }, []);
  return (
    <Grid container>
      {allClassess.length > 0 &&
        allClassess.map((classes, idx) => (
          <Grid item lg={4} xs={12} sm={6}>
            <Card sx={{
              borderRadius: '10px',
              textAlign: 'center'
              // background: '#FFD78A'
            }}>
              <CardContent>
                <Typography gutterBottom variant="h2" component="div">
                  {classes.course_name + ' ' + classes.department_name + ' Rotuine'}
                </Typography>
                <Box display="flex"
                  sx={{ mt: 4, flexWrap: 'wrap' }}
                  alignItems="center"
                  flexDirection='row'
                  justifyContent='center'
                  gap={2}>
                  <Chip size="small" label={getOrdinals(classes.year) + ' Year'} color="primary" />
                  <Chip size="small" label={getOrdinals(classes.semester) + ' Semester'} color="primary" />
                </Box>
              </CardContent>
              <CardActions sx={{ display: 'flex',flexDirection:'column',gap:'8px' }} >
                
                {/* <Link style={{ textDecoration: 'none', color: 'inherit' }} href='/student/classhistory'>
                  <Button onClick={null} variant="contained" color="success" startIcon={<InfoIcon />} >Info</Button>
                </Link> */}
                <Button size="large" onClick={() => (window.open(classes.routine_url, "_blank"))} variant="contained" color="success" startIcon={<FileDownload />}> Syllabus</Button>
               
              </CardActions>
              <Accordion sx={{width:"100%"}} expanded={expanded === `panel${idx+1}`} onChange={handleChange(`panel${idx+1}`)}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography variant="h2" fontWeight={500} textTransform='capitalize'>Info</Typography>
                   
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                      malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
            </Card>
          </Grid>
        ))}
    </Grid>
  )
}

export default Classes
