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
} from "@mui/material";
import NextLink from "next/link";
import Notices from "../../Notices";
import DataCount from "../../DataCount";

function teacherDashboard() {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={3}>
        <DataCount title = "Total Student" data="0" color="#e040fb"/>
      </Grid>
      <Grid item xs={12} lg={3}>
        <DataCount title = "Pending Student" data="0" color="#ffee58"/>
      </Grid>
      <Grid item xs={12} lg={3}>
        <DataCount title = "Total Present" data="0" color="#66bb6a"/>
      </Grid>
      <Grid item xs={12} lg={3}>
        <DataCount title = "Total Absent" data="0" color="#ef5350"/>
      </Grid>
      <Grid item xs={12} lg={12}>
        <Notices/>
      </Grid>
    </Grid>
  );
}

export default teacherDashboard;