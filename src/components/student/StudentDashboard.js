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
import Notices from "../Notices";
import DataCount from "../DataCount";

function StudentDashboard() {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={3}>
        <DataCount title = "Total Present" data="70" color="#26c6da"/>
      </Grid>
      <Grid item xs={12} lg={3}>
        <DataCount title = "Total Classes" data="70" color="#ffee58"/>
      </Grid>
      <Grid item xs={12} lg={3}>
        <DataCount title = "Total Points" data="70" color="#66bb6a"/>
      </Grid>
      <Grid item xs={12} lg={3}>
        <DataCount title = "Total Absent" data="20" color="#ef5350"/>
      </Grid>
      <Grid item xs={12} lg={12}>
        <Notices/>
      </Grid>
    </Grid>
  );
}

export default StudentDashboard;
