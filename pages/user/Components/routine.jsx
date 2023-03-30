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
  TableContainer,
  Paper,
  Modal,
  TextField,
  InputAdornment,
  IconButton,
  Pagination,
  TablePagination,
  Fab,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Row,
  Col
} from "@mui/material";
import axios from "axios";
import { useSelect } from "@mui/base";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

import Snackbar from "@mui/material/Snackbar";
import FeatherIcon from "feather-icons-react";
import { FileDownload, FileUpload, UploadFile } from "@mui/icons-material";
import { getOrdinals } from "../../../src/Helper/functions";
function Routine() {
  const [allRoutine, setAllRoutine] = useState([]);
  useEffect(() => {
    const getAllRoutines = async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}get_all_routine`,
        null,
        { headers: { Authorization: `Bearer ${Cookies.get("access_key")}` } }
      );
      setAllRoutine(res.data.data.routine);
      console.log(res.data);
    };
    getAllRoutines();
  }, []);
  return (
    <Grid container>
      {allRoutine.length > 0 &&
        allRoutine.map((routine, idx) => (
          <Grid item lg={3} xs={12}>
            <Card sx={{
              borderRadius: '10px',
              textAlign: 'center'
              // background: '#FFD78A'
            }}>
              <CardContent>
                <Typography gutterBottom variant="h2" component="div">
                  {routine.course_name + ' ' + routine.department_name + ' Rotuine'}
                </Typography>
                <Box display="flex"
                  sx={{ mt: 4, flexWrap: 'wrap' }}
                  alignItems="center"
                  flexDirection='row'
                  justifyContent='center'
                  gap={2}>
                  <Chip size="small" label={getOrdinals(routine.year) + ' Year'} color="primary" />
                  <Chip size="small" label={getOrdinals(routine.semester) + ' Semester'} color="primary" />
                </Box>
              </CardContent>
              <CardActions >
                <Button onClick={() => (window.open(routine.routine_url, "_blank"))} variant="contained" color="success" startIcon={<FileDownload />} sx={{ mx: 'auto', borderRadius: '20px' }}>Download</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
    </Grid>
  )
}

export default Routine
