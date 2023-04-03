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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CardHeader

} from "@mui/material";
import axios from "axios";
import { useSelect } from "@mui/base";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

import Snackbar from "@mui/material/Snackbar";
import FeatherIcon from "feather-icons-react";
import { AccessAlarm, CheckCircleOutline, Download, FileDownload, FileUpload, HighlightOff, PostAdd, UploadFile } from "@mui/icons-material";
import { getOrdinals } from "../../../src/Helper/functions";
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
function Classes() {
  const [allClassess, setallClassess] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
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
              borderRadius: '6px',
            }}>
              {/* <CardHeader
                title={<Typography variant="h3" noWrap maxWidth='300px' sx={{color:'#38b000'}} fontWeight='bold'>
                OEC-801
                </Typography>}
                sx={{ mb: '-5px' }}
                action={
                    <IconButton>
                      <PostAdd />
                    </IconButton>
                  }
              /> */}
              <CardContent>
                <Typography variant="h2"  sx={{textAlign:'center',fontWeight:'bold'}}>
                Cryptography & Network Security
                </Typography>
                <Box display="flex"
                  sx={{ mt: 2, flexWrap: 'wrap' }}
                  alignItems="center"
                  flexDirection='row'
                  justifyContent='center'
                  gap={2}>
                  <Chip size="small" label={getOrdinals(classes.year) + ' Year'} color="info" sx={{ color: '#fff', fontWeight: 'bold' }} />
                  <Chip size="small" label={getOrdinals(classes.semester) + ' Semester'} sx={{ fontWeight: 'bold' }} color="secondary" />
                </Box>
              </CardContent>

              <CardActions disableSpacing>
                <Button variant="outline" startIcon={<Download />} sx={{ color: '#ff5400', fontWeight: 'bold' }}>Syllabus</Button>
                <Button variant="outline" expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded} sx={{ ml: 'auto', color: '#014f86', fontWeight: 'bold' }} startIcon={<AccessAlarm />}>Classes</Button>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <TableContainer>
                    <Table aria-label="simple table" size="small">
                      <TableHead sx={{ bgcolor: '#bee1e6' }}>
                        <TableRow>
                          <TableCell align="center">Topic</TableCell>
                          <TableCell align="center">status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow
                          key={1}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell align="center">chapter 1</TableCell>
                          <TableCell align="center">
                            <IconButton title="Present" size="small">
                              <CheckCircleOutline color="success" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                        <TableRow
                          key={2}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell align="center">chapter 2</TableCell>
                          <TableCell align="center">
                            <IconButton title="Absent" size="small">
                              <HighlightOff color="danger" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        ))}
    </Grid>
  )
}

export default Classes
