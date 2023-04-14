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
function syllabus() {
  // const [allSubjectOfTeacher, setallSubjectOfTeacher] = useState([]);
  // useEffect(() => {
  //   const getSubjectOfTeacher = async () => {
  //     const res = await axios.post(
  //       `${process.env.NEXT_PUBLIC_BASE_URL}get_teacher_subject_sylabus`,
  //       { teacher_id: 1 },
  //       { headers: { Authorization: `Bearer ${Cookies.get("access_key")}` } }
  //     );
  //     setallSubjectOfTeacher(res.data.data.subjects);
  //     console.log(res.data);
  //   };
  //   getSubjectOfTeacher();
  // }, []);
  return (
    <Grid container>
      <Grid item lg={3} xs={12}>
        <Card sx={{
          borderRadius: '10px',
          textAlign:'center'
          // background: '#FFD78A'
        }}>
          <CardContent>
            <Typography gutterBottom variant="h2" component="div">
              [Title]
            </Typography>
            <Box display="flex"
              sx={{ mt:4,flexWrap: 'wrap' }}
              alignItems="center"
              flexDirection='row'
              justifyContent='center'
              gap={2}>
              <Chip  size="small" label="primary" color="primary" />
              <Chip  size="small" label="primary" color="primary" />
            </Box>
          </CardContent>
          <CardActions >
            <Button variant="contained" color="success" startIcon={<FileDownload />} sx={{ mx: 'auto', borderRadius: '20px' }}>Download</Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}

export default syllabus
