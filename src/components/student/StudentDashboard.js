import * as React from "react";
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
  Grid,
  Paper,
} from "@mui/material";
import NextLink from "next/link";
import Notices from "../Notices";
import DataCount from "../DataCount";
import { Add, Download } from "@mui/icons-material";

function StudentDashboard(props) {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12} >
        <Box
          display="flex"
          alignItems="center"
          flexDirection={{ md: "row", xs: "column" }}
          justifyContent={{ md: "space-between", xs: "center" }}
          gap={1}
          px={1}
          py={1}
          sx={{ flexWrap: "wrap" }}
          component={Paper}
        >
          <Box>
            <Button  size="small" color="success" sx={{fontWeight:'bold',fontSize:{md:'16px',xs:'16px'}}}>
            Current Session: {props?.userData?.course_name +' ('+props?.userData?.session_name+')'}
          </Button>
            </Box>
          <Box>
            <Button variant='contained' size="small" color='warning' startIcon={<Download />}>
              Routine
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} lg={12}>
        <Notices />
      </Grid>
    </Grid>
  );
}

export default StudentDashboard;
