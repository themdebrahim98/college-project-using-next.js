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
  Grid,
} from "@mui/material";
import NextLink from "next/link";
import Notices from "../Notices";
import DataCount from "../DataCount";
import { BASE_URL } from "../../../commonVariable";
// import NextLink from "next/Link";
import Cookies from "js-cookie";
import axios from "axios";
import { useSelector } from "react-redux";
function adminDashboard() {

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={3}>
        <DataCount title="Total Teachers" data="70" color="#e040fb" />
      </Grid>
      <Grid item xs={12} lg={3}>
        <DataCount title="Total Students" data="70" color="#ffee58" />
      </Grid>
      <Grid item xs={12} lg={3}>
        <DataCount title="Pending Present" data="70" color="#66bb6a" />
      </Grid>
      <Grid item xs={12} lg={3}>
        <DataCount title="Passout Student" data="20" color="#ef5350" />
      </Grid>
      <Grid item xs={12} lg={12}>
        <Notices />
      </Grid>
    </Grid>
  );
}

export default adminDashboard;
